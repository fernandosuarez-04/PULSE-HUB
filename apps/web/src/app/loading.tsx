/**
 * Loading Component
 * 
 * Shows a loading state while pages are being rendered.
 * Provides better UX during navigation between pages.
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f8ff] via-[#fefeff] via-50% to-[#f0f5ff] flex items-center justify-center">
      <div className="text-center">
        {/* Pulse Hub Logo */}
        <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
          <div className="w-12 h-12 bg-gradient-to-br from-[var(--primary-600)] to-[var(--accent-orange)] rounded-full"></div>
        </div>
        
        {/* Loading Text */}
        <h2 className="text-xl font-semibold text-[var(--neutral-900)] mb-2">
          Cargando Pulse Hub...
        </h2>
        <p className="text-[var(--neutral-600)]">
          Preparando tu experiencia con IA
        </p>
        
        {/* Loading Animation */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-[var(--primary-600)] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-[var(--accent-orange)] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}
