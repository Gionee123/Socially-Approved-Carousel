import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FiArrowLeft, FiSave, FiUpload, FiImage, FiX } from 'react-icons/fi'

const API = `${import.meta.env.VITE_API_BASE_URL}/api/admin/video`

export default function Addvideo() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const editId = searchParams.get('id')
    const isEdit = Boolean(editId)

    const [form, setForm] = useState({
        title: '',
        description: '',
        thumbnail: '',
        duration: '',
        status: 'true',
    })
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [thumbnailPreview, setThumbnailPreview] = useState<string>('')
    const [isDragging, setIsDragging] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const dropRef = useRef<HTMLDivElement>(null)

    // Load existing video data for edit
    useEffect(() => {
        if (isEdit && editId) {
            setFetching(true)
            axios.post(`${API}/details`, { id: editId })
                .then(res => {
                    const v = res.data.data
                    setForm({
                        title: v.title || '',
                        description: v.description || '',
                        thumbnail: v.thumbnail || '',
                        duration: v.duration?.toString() || '',
                        status: v.status ? 'true' : 'false',
                    })
                    if (v.thumbnail) setThumbnailPreview(v.thumbnail)
                })
                .catch(() => setError('Failed to load video data.'))
                .finally(() => setFetching(false))
        }
    }, [editId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleThumbnailFile = useCallback(async (file: File) => {
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file for thumbnail.')
            return
        }
        // Show preview immediately
        const reader = new FileReader()
        reader.onload = (e) => setThumbnailPreview(e.target?.result as string)
        reader.readAsDataURL(file)
        setThumbnailFile(file)

        // Upload to cloudinary via API
        setUploading(true)
        const fd = new FormData()
        fd.append('thumbnail', file)
        axios.post(`${API}/upload-thumbnail`, fd)
            .then(res => {
                setForm(prev => ({ ...prev, thumbnail: res.data.url }))
            })
            .catch(() => setError('Thumbnail upload failed. Please try again.'))
            .finally(() => setUploading(false))
    }, [])

    // Drag and Drop handlers
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }
    const handleDragLeave = () => setIsDragging(false)
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files?.[0]
        if (file) handleThumbnailFile(file)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        setLoading(true)

        const formData = new FormData()
        formData.append('title', form.title)
        formData.append('description', form.description)
        formData.append('thumbnail', form.thumbnail)
        formData.append('duration', form.duration)
        formData.append('status', form.status)
        if (videoFile) formData.append('videoUrl', videoFile)

        const req = isEdit
            ? axios.put(`${API}/update/${editId}`, formData)
            : axios.post(`${API}/add`, formData)

        req
            .then(() => {
                setSuccess(isEdit ? 'Video updated successfully!' : 'Video added successfully!')
                setTimeout(() => navigate('/admin/view-video'), 1200)
            })
            .catch(err => setError(err.response?.data?.message || 'Something went wrong.'))
            .finally(() => setLoading(false))
    }

    if (fetching) return <div className="p-10 text-center text-gray-400">Loading video data...</div>

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/admin/view-video')} className="text-gray-400 hover:text-gray-200 transition-colors">
                    <FiArrowLeft size={22} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-100">{isEdit ? 'Edit Video' : 'Add New Video'}</h1>
                    <p className="text-gray-400 text-sm mt-1">{isEdit ? 'Update video information' : 'Upload a new video'}</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-gray-800 rounded-xl border border-gray-700/50 p-6 space-y-5">
                {error && <div className="bg-red-900/30 border border-red-700 text-red-300 rounded-lg px-4 py-3 text-sm">{error}</div>}
                {success && <div className="bg-green-900/30 border border-green-700 text-green-300 rounded-lg px-4 py-3 text-sm">{success}</div>}

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Title <span className="text-red-400">*</span></label>
                    <input
                        type="text" name="title" value={form.title} onChange={handleChange} required
                        placeholder="Enter video title"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                        name="description" value={form.description} onChange={handleChange} rows={3}
                        placeholder="Enter video description"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                </div>

                {/* Thumbnail - Drag & Drop */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Thumbnail {isEdit && <span className="text-gray-500 text-xs">(leave empty to keep existing)</span>}
                    </label>

                    {thumbnailPreview ? (
                        <div className="relative inline-block">
                            <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full max-h-48 object-cover rounded-lg border border-gray-600" />
                            <button
                                type="button"
                                onClick={() => { setThumbnailPreview(''); setThumbnailFile(null); setForm(prev => ({ ...prev, thumbnail: '' })) }}
                                className="absolute top-2 right-2 bg-red-600 hover:bg-red-500 text-white rounded-full p-1 transition-colors"
                            >
                                <FiX size={14} />
                            </button>
                            {uploading && <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white text-sm">Uploading...</div>}
                        </div>
                    ) : (
                        <div
                            ref={dropRef}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative flex flex-col items-center justify-center gap-3 px-4 py-10 bg-gray-900 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${isDragging ? 'border-blue-500 bg-blue-900/10' : 'border-gray-600 hover:border-blue-400'}`}
                        >
                            <FiImage size={32} className={`${isDragging ? 'text-blue-400' : 'text-gray-500'} transition-colors`} />
                            <div className="text-center">
                                <p className="text-gray-300 font-medium text-sm">Drag & drop thumbnail here</p>
                                <p className="text-gray-500 text-xs mt-1">or click to browse from your PC</p>
                                <p className="text-gray-600 text-xs mt-1">JPG, PNG, WEBP supported</p>
                            </div>
                            <label className="mt-1 px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium rounded-lg cursor-pointer transition-colors">
                                Browse File
                                <input
                                    type="file" accept="image/*" className="hidden"
                                    onChange={e => { const f = e.target.files?.[0]; if (f) handleThumbnailFile(f) }}
                                />
                            </label>
                        </div>
                    )}
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Duration (seconds, max 30)</label>
                    <input
                        type="number" name="duration" value={form.duration} onChange={handleChange}
                        min={1} max={30} placeholder="e.g. 15"
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>

                {/* Video File */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                        Video File {isEdit && <span className="text-gray-500 text-xs">(leave empty to keep existing)</span>}
                        {!isEdit && <span className="text-red-400"> *</span>}
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 bg-gray-900 border border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                        <FiUpload className="text-gray-400" size={20} />
                        <span className="text-gray-400 text-sm">{videoFile ? videoFile.name : 'Click to select video file'}</span>
                        <input type="file" accept="video/*" className="hidden" onChange={e => setVideoFile(e.target.files?.[0] || null)} />
                    </label>
                </div>

                {/* Status */}
                <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
                    <select
                        name="status" value={form.status} onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                {/* Submit */}
                <button
                    type="submit" disabled={loading || uploading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                    <FiSave size={18} />
                    {uploading ? 'Uploading thumbnail...' : loading ? 'Saving...' : isEdit ? 'Update Video' : 'Add Video'}
                </button>
            </form>
        </div>
    )
}
