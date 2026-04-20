"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Trash2, ImageIcon, Loader2, AlertCircle } from "lucide-react"

interface GalleryImage {
  url: string
  pathname: string
  filename: string
  uploadedAt: string
}

export function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = useCallback(async () => {
    try {
      setError(null)
      const res = await fetch("/api/admin/gallery")
      const data = await res.json()
      
      if (res.ok) {
        setImages(data.images || [])
      } else {
        setError(data.error || "Error al cargar imagenes")
      }
    } catch {
      setError("Error de conexion")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchImages()
  }, [fetchImages])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    setError(null)

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/admin/gallery", {
          method: "POST",
          body: formData,
        })

        if (!res.ok) {
          const data = await res.json()
          throw new Error(data.error || "Error al subir imagen")
        }
      }

      await fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al subir imagen")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleDelete = async (url: string) => {
    if (!confirm("¿Estas seguro de eliminar esta imagen?")) return

    setDeleting(url)
    setError(null)

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      })

      if (res.ok) {
        setImages((prev) => prev.filter((img) => img.url !== url))
      } else {
        const data = await res.json()
        setError(data.error || "Error al eliminar imagen")
      }
    } catch {
      setError("Error de conexion")
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card className="border-dashed border-2 border-border bg-card/50">
        <CardContent className="p-8">
          <label className="flex flex-col items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
            {uploading ? (
              <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            ) : (
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
            )}
            <span className="text-lg font-medium mb-2">
              {uploading ? "Subiendo imagenes..." : "Subir Imagenes"}
            </span>
            <span className="text-sm text-muted-foreground">
              Arrastra archivos aqui o haz clic para seleccionar
            </span>
          </label>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Images Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Imagenes de la Galeria ({images.length})
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : images.length === 0 ? (
          <Card className="border-border bg-card/50">
            <CardContent className="p-12 text-center">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">No hay imagenes</p>
              <p className="text-sm text-muted-foreground">
                Sube imagenes para mostrarlas en el carrusel de la galeria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.url} className="group relative overflow-hidden border-border">
                <div className="aspect-[4/3] relative">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(image.url)}
                      disabled={deleting === image.url}
                      className="gap-2"
                    >
                      {deleting === image.url ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                      Eliminar
                    </Button>
                  </div>
                </div>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground truncate">
                    {image.filename}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <Card className="border-border bg-card/50">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong>Nota:</strong> Las imagenes subidas aqui se mostraran automaticamente en el carrusel de la galeria de la pagina principal. Si no hay imagenes subidas, se usaran las imagenes por defecto configuradas.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
