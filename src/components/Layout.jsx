import Sidebar from './Sidebar'
import Header from './Header'
import Notifications from './Notifications'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />
      <div className="lg:pl-72 flex min-h-screen flex-col">
        <Header />
        <main id="main-scroll" className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[1400px] px-4 py-6 lg:px-8">{children}</div>
        </main>
      </div>
      <Notifications />
    </div>
  )
}
