import { put, list, del } from "@vercel/blob"
import { type NextRequest, NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"

// Gallery image prefix for blob storage
const GALLERY_PREFIX = "gallery/"
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB en bytes
const MAX_IMAGES = 40 // Máximo número de imágenes permitidas

// Validar que el token de Vercel Blob está configurado
function getBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_NOLIMIT_READ_WRITE_TOKEN
  if (!token) {
    throw new Error(
      "BLOB_READ_WRITE_TOKEN no configurado. Por favor, configura esta variable de entorno en .env.local"
    )
  }
  return token
}

export async function GET() {
  try {
    const token = getBlobToken()
    const { blobs } = await list({ prefix: GALLERY_PREFIX, token })
    
    const images = blobs.map((blob) => ({
      url: blob.url,
      pathname: blob.pathname,
      filename: blob.pathname.replace(GALLERY_PREFIX, ""),
      uploadedAt: blob.uploadedAt,
    }))

    return NextResponse.json({ images })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error listing gallery images:", errorMessage)
    
    if (errorMessage.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json({ 
        error: "Configuración faltante: BLOB_READ_WRITE_TOKEN no está configurado" 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Error al listar imagenes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const token = getBlobToken()
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se proporciono archivo" }, { status: 400 })
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen" }, { status: 400 })
    }

    // Validar tamaño de archivo (máximo 50 MB)
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `El archivo es muy grande. Máximo permitido: 50 MB (tu archivo: ${(file.size / 1024 / 1024).toFixed(2)} MB)` 
      }, { status: 400 })
    }

    // Validar número máximo de imágenes
    const { blobs } = await list({ prefix: GALLERY_PREFIX, token })
    if (blobs.length >= MAX_IMAGES) {
      return NextResponse.json({ 
        error: `Límite alcanzado. Máximo permitido: ${MAX_IMAGES} imágenes (actualmente hay: ${blobs.length})` 
      }, { status: 400 })
    }

    const filename = `${GALLERY_PREFIX}${Date.now()}-${file.name}`
    
    const blob = await put(filename, file, {
      access: "public",
      token,
    })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      filename: file.name,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error uploading image:", errorMessage)
    
    if (errorMessage.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json({ 
        error: "Configuración faltante: BLOB_READ_WRITE_TOKEN no está configurado" 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const token = getBlobToken()
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No se proporciono URL" }, { status: 400 })
    }

    await del(url, { token })

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error deleting image:", errorMessage)
    
    if (errorMessage.includes("BLOB_READ_WRITE_TOKEN")) {
      return NextResponse.json({ 
        error: "Configuración faltante: BLOB_READ_WRITE_TOKEN no está configurado" 
      }, { status: 500 })
    }
    
    return NextResponse.json({ error: "Error al eliminar imagen" }, { status: 500 })
  }
}
