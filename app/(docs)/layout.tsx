import { DocsSidebar } from '@/app/_docs/components/DocsSidebar';
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
      <div className='flex pt-14 min-h-screen'>
        <DocsSidebar />
        <main className='ml-56 flex-1 px-8 py-10 max-w-3xl'>{children}</main>
      </div>
    </>
  );
};

export default DocsLayout;
