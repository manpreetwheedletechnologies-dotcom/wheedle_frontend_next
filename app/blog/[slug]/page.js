import BlogDetails from '../../../components/Blog_preview';

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `Blog | Wheedle Technologies`,
    description:
      'Read our latest blog post on AI, automation and digital transformation.',
  };
}

export default async function BlogSlugPage({ params }) {
  const { slug } = await params;

  return <BlogDetails slug={slug} />;
}