import React from 'react';
import { default as LayoutMain } from 'layouts/main';
import Content from 'components/pages/doc-page/content';

export default function DocPage(props) {
  const {
    pageContext: {
      remarkNode: { html, frontmatter },
      sidebarTree,
      breadcrumbs,
    },
  } = props;

  const pageMetadata = {
    data: {
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      slug: frontmatter.slug,
    },
  };

  return (
    <LayoutMain pageMetadata={pageMetadata} sidebar={sidebarTree}>
      {/* <Breadcrumbs breadcrumbs={breadcrumbs} /> */}
      <Content content={html} articleSrc={frontmatter.fileOrigin}/>
    </LayoutMain>
  );
}
