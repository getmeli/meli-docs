import React from 'react';
import { default as LayoutMain } from 'layouts/main';
import Content from 'components/pages/doc-page/content';
import SectionContentTable from 'components/pages/doc-page/section-content-table';
import Breadcrumbs from 'components/shared/breadcrumbs';
import contentStyles from 'components/pages/doc-page/content/content.module.scss';

export default function DocSectionPage({
  pageContext: {
    title,
    excerpt,
    slug,
    content,
    sidebarTree,
    sectionLinks,
    breadcrumbs,
  },
}) {
  return (
    <LayoutMain
      seoMetadata={{ title, content: excerpt, slug }}
      sidebar={sidebarTree}
    >
      <Breadcrumbs breadcrumbs={breadcrumbs}/>
      <Content content={content} className={contentStyles.wrapperSection}/>
      <SectionContentTable sectionLinks={sectionLinks}/>
    </LayoutMain>
  );
}
