import BlogDetails from '../../../components/Blog_preview';

export async function generateMetadata({ params }) {
  return {
    title: `Blog | Wheedle Technologies`,
    description: 'Read our latest blog post on AI, automation and digital transformation.',
  };
}

export default function BlogSlugPage({ params }) {
  return <BlogDetails slug={params.slug} />;
}
