"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { 
  Link2, Upload, FileText, CheckCircle2, XCircle, 
  Clock, Send, ExternalLink, RotateCcw, Loader2,
  AlertCircle
} from "lucide-react"

interface WorkSubmissionProps {
  submission: any
  onUpdate: (updated: any) => void
}

const STATUS_CONFIG: Record<string, { icon: any; label: string; color: string; bg: string }> = {
  applied: { icon: Clock, label: 'Applied — Awaiting Start', color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/20' },
  submitted: { icon: Clock, label: 'Work Under Review', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  approved: { icon: CheckCircle2, label: 'Approved & Paid', color: 'text-green-400', bg: 'bg-green-400/10 border-green-400/20' },
  rejected: { icon: XCircle, label: 'Rejected — Resubmit', color: 'text-red-400', bg: 'bg-red-400/10 border-red-400/20' },
}

export function WorkSubmissionPanel({ submission, onUpdate }: WorkSubmissionProps) {
  const [workLink, setWorkLink] = useState("")
  const [message, setMessage] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const status = submission.status || 'applied'
  const statusCfg = STATUS_CONFIG[status] || STATUS_CONFIG.applied
  const StatusIcon = statusCfg.icon

  const canSubmit = status === 'applied' || status === 'rejected'

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (selected.size > maxSize) {
      toast.error("File exceeds 10MB limit")
      return
    }
    const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                     'application/zip', 'image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(selected.type)) {
      toast.error("Only PDF, DOCX, ZIP, JPG, PNG files are allowed")
      return
    }
    setFile(selected)
    toast.success(`File selected: ${selected.name}`)
  }

  const handleSubmit = async () => {
    if (!workLink.trim()) {
      toast.error("Work Link is required — paste your Google Drive, Notion, or live link")
      return
    }
    try { new URL(workLink) } catch {
      toast.error("Please enter a valid URL (starting with http:// or https://)")
      return
    }

    setSubmitting(true)
    try {
      // In a real system you'd upload file to Cloudinary/S3 first and get fileUrl
      // For now we store the metadata and link
      const fileData = file ? {
        fileUrl: `uploaded:${file.name}`, // replace with real upload URL
        fileName: file.name,
        fileSize: file.size,
      } : {}

      const res = await fetch('/api/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: submission._id,
          workLink: workLink.trim(),
          message,
          ...fileData
        })
      })

      const data = await res.json()
      if (res.ok) {
        toast.success("Work submitted! Admin will review shortly.")
        setWorkLink("")
        setMessage("")
        setFile(null)
        onUpdate(data.submission)
      } else {
        toast.error(data.error || "Submission failed")
      }
    } catch (err) {
      toast.error("Network error — please try again")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Status Banner */}
      <div className={`p-4 rounded-2xl border flex items-center gap-3 ${statusCfg.bg}`}>
        <StatusIcon className={`w-5 h-5 ${statusCfg.color} shrink-0`} />
        <div className="flex-1">
          <p className={`text-sm font-bold ${statusCfg.color}`}>{statusCfg.label}</p>
          {submission.feedback && (
            <p className="text-xs text-white/60 mt-1 leading-relaxed">
              Admin feedback: "{submission.feedback}"
            </p>
          )}
        </div>
        {status === 'rejected' && (
          <div className="flex items-center gap-1 text-xs text-red-400/70 font-bold uppercase tracking-wider">
            <RotateCcw className="w-3 h-3" />
            Resubmit
          </div>
        )}
      </div>

      {/* Already submitted work — show it */}
      {submission.workLink && (
        <div className="p-5 bg-white/5 border border-white/10 rounded-2xl space-y-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Your Submitted Work</p>
          <a 
            href={submission.workLink} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-3 text-blue-400 hover:text-blue-300 transition-colors group"
          >
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            <span className="text-sm font-bold truncate">{submission.workLink}</span>
          </a>
          {submission.fileName && (
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <FileText className="w-4 h-4" />
              <span>{submission.fileName}</span>
              <span>({Math.round((submission.fileSize || 0)/1024)} KB)</span>
            </div>
          )}
          {submission.message && (
            <p className="text-xs text-white/50 leading-relaxed border-t border-white/5 pt-3">
              {submission.message}
            </p>
          )}
        </div>
      )}

      {/* Submission Form */}
      {canSubmit && (
        <div className="space-y-5 p-6 bg-white/3 rounded-2xl border border-white/10">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">
              {status === 'rejected' ? 'Resubmit Your Work' : 'Submit Your Work'}
            </p>
          </div>

          {/* Work Link — REQUIRED */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white/70">
              <Link2 className="w-3.5 h-3.5 text-[var(--primary)]" />
              Work Link 
              <span className="text-red-400 ml-1">*</span>
              <span className="text-white/30 font-normal">(Google Drive, GitHub, Notion, live URL)</span>
            </label>
            <input
              type="url"
              value={workLink}
              onChange={(e) => setWorkLink(e.target.value)}
              placeholder="https://drive.google.com/..."
              className="w-full bg-white/5 border border-white/10 focus:border-[var(--primary)]/50 rounded-xl px-4 h-12 text-sm font-medium outline-none transition-all placeholder:text-white/20"
            />
            {!workLink && (
              <p className="text-[10px] text-red-400/70 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3" />
                Required — you cannot submit without a work link
              </p>
            )}
          </div>

          {/* File Upload — OPTIONAL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-white/70">
              <Upload className="w-3.5 h-3.5 text-white/40" />
              Attach File
              <span className="text-white/30 font-normal">(Optional — PDF, DOCX, ZIP, JPG, PNG • max 10MB)</span>
            </label>
            <div 
              onClick={() => fileRef.current?.click()}
              className="w-full border border-dashed border-white/10 hover:border-[var(--primary)]/40 rounded-xl p-6 text-center cursor-pointer transition-all hover:bg-white/5 group"
            >
              {file ? (
                <div className="flex items-center justify-center gap-3 text-white">
                  <FileText className="w-5 h-5 text-[var(--primary)]" />
                  <div className="text-left">
                    <p className="text-sm font-bold">{file.name}</p>
                    <p className="text-xs text-white/40">{Math.round(file.size / 1024)} KB</p>
                  </div>
                </div>
              ) : (
                <div className="text-white/20 group-hover:text-white/40 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-xs font-bold">Click or drag file here</p>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".pdf,.docx,.zip,.jpg,.jpeg,.png,.webp" onChange={handleFileChange} className="hidden" />
          </div>

          {/* Optional Message */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-white/70">Note to Admin (Optional)</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder="Briefly describe your work or any context the admin should know..."
              className="w-full bg-white/5 border border-white/10 focus:border-[var(--primary)]/50 rounded-xl px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-white/20 resize-none"
            />
          </div>

          <Button
            onClick={handleSubmit}
            disabled={submitting || !workLink.trim()}
            className="w-full h-12 btn-cta-gradient font-bold rounded-xl text-white flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {submitting ? 'Submitting...' : status === 'rejected' ? 'Resubmit Work' : 'Submit Work for Review'}
          </Button>
        </div>
      )}

      {/* Awaiting / Done State */}
      {status === 'submitted' && (
        <div className="text-center py-4 text-white/30 text-xs font-bold uppercase tracking-widest">
          Admin is reviewing your submission. You'll be notified with feedback.
        </div>
      )}
      {status === 'approved' && (
        <div className="text-center py-4 text-green-400/60 text-xs font-bold uppercase tracking-widest">
          🎉 Payout released to your wallet
        </div>
      )}
    </div>
  )
}
