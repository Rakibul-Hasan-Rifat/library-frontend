import Footer from '@/components/common/Footer'
import { Navbar } from '@/components/common/Navbar'
import { Outlet } from 'react-router'

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout