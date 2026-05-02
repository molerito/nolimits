import { NextResponse } from "next/server"
import { isAuthenticated } from "@/lib/auth"
import { promises as fs } from "fs"
import { join } from "path"

const GALLERY_DIR = join(process.cwd(), "public", "images")
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB en bytes
const MAX_IMAGES = 40 // Máximo número de imágenes permitidas
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"]

// Obtener la extensión de un archivo
function getFileExtension(filename: string): string {
  return filename.toLowerCase().slice(filename.lastIndexOf("."))
}

// Validar que sea una imagen permitida
function isValidImageFile(filename: string): boolean {
  const ext = getFileExtension(filename)
  return ALLOWED_EXTENSIONS.includes(ext)
}

export async function GET() {
  try {
    // Crear directorio si no existe
    try {
      await fs.mkdir(GALLERY_DIR, { recursive: true })
    } catch {
      // El directorio ya existe
    }

    // Listar archivos en la galería
    const files = await fs.readdir(GALLERY_DIR)
    
    // Filtrar solo imágenes válidas y ordenar por fecha (más recientes primero)
    const imageFiles = files
      .filter(isValidImageFile)
      .sort()
      .reverse()

    const images = imageFiles.map((filename) => ({
      url: `/images/${filename}`,
      pathname: filename,
      filename: filename,
      uploadedAt: new Date().toISOString(),
    }))

    return NextResponse.json({ images })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error listing gallery images:", errorMessage)
    return NextResponse.json({ error: "Error al listar imagenes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    // Crear directorio si no existe
    try {
      await fs.mkdir(GALLERY_DIR, { recursive: true })
    } catch {
      // El directorio ya existe
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No se proporciono archivo" }, { status: 400 })
    }

    // Validar tipo de archivo
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "El archivo debe ser una imagen" }, { status: 400 })
    }

    // Validar extensión
    const ext = getFileExtension(file.name)
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return NextResponse.json({ 
        error: `Formato no permitido. Formatos válidos: ${ALLOWED_EXTENSIONS.join(", ")}` 
      }, { status: 400 })
    }

    // Validar tamaño de archivo
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: `El archivo es muy grande. Máximo permitido: 5 MB (tu archivo: ${(file.size / 1024 / 1024).toFixed(2)} MB)` 
      }, { status: 400 })
    }

    // Validar número máximo de imágenes
    const existingFiles = await fs.readdir(GALLERY_DIR)
    const imageFiles = existingFiles.filter(isValidImageFile)
    
    if (imageFiles.length >= MAX_IMAGES) {
      return NextResponse.json({ 
        error: `Límite alcanzado. Máximo permitido: ${MAX_IMAGES} imágenes (actualmente hay: ${imageFiles.length})` 
      }, { status: 400 })
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`
    const filepath = join(GALLERY_DIR, filename)

    // Convertir File a Buffer y guardar
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filepath, buffer)

    return NextResponse.json({
      url: `/images/${filename}`,
      pathname: filename,
      filename: filename,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error uploading image:", errorMessage)
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const authenticated = await isAuthenticated()
  if (!authenticated) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "No se proporciono URL" }, { status: 400 })
    }

    // Extraer el nombre del archivo de la URL
    const filename = url.replace("/images/", "")
    
    // Validar que el nombre no contiene caracteres peligrosos
    if (filename.includes("..") || filename.includes("/")) {
      return NextResponse.json({ error: "Nombre de archivo inválido" }, { status: 400 })
    }

    const filepath = join(GALLERY_DIR, filename)

    // Verificar que el archivo existe
    try {
      await fs.access(filepath)
    } catch {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 })
    }

    // Eliminar el archivo
    await fs.unlink(filepath)

    return NextResponse.json({ success: true })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Error desconocido"
    console.error("Error deleting image:", errorMessage)
    return NextResponse.json({ error: "Error al eliminar imagen" }, { status: 500 })
  }
}
