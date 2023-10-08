import clasess from './Page.module.css'

interface PageProps {
  children: React.ReactNode
  backgroundColor?: string
}

const Page: React.FC<PageProps> = ({
  children,
  backgroundColor,
}) => {
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className={clasess.page}
    >
      {children}
    </div>
  )
}

export default Page
