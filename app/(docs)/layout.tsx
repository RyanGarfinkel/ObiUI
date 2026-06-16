import { DocsSidebar } from '@/app/_docs/components/DocsSidebar';
import { Footer } from '@/app/_docs/components/Footer';
import { TopNav } from '@/app/_docs/components/TopNav';

const DocsLayout = (
  {
    children,
  }: {
    children: React.ReactNode;
  }
) => {
  return (
    <>
      <TopNav />
      <div className='flex pt-14 min-h-screen flex-col'>
        <div className='flex flex-1'>
          <DocsSidebar />
          <main className='flex-1 min-w-0 px-4 py-8 md:ml-56 md:px-8 md:py-10 max-w-3xl'>{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DocsLayout;
