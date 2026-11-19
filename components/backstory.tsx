import { PortableText, type PortableTextBlock } from "@portabletext/react";

// These editorial subheads delimit independently expandable parts of the CMS copy.
const sectionHeadings = new Set(["LESSONS IN PAIN", "THE CRITICAL QUESTION"]);

export function Backstory({ blocks }: { blocks: PortableTextBlock[] }) {
  const introduction: PortableTextBlock[] = [];
  const sections: { key: string; title: string; blocks: PortableTextBlock[] }[] = [];
  for (const block of blocks) {
    const text = block.children?.map((child) => child.text || "").join("").trim();
    if (sectionHeadings.has(text.toUpperCase())) {
      sections.push({ key: block._key || `section-${sections.length}`, title: text, blocks: [] });
    } else if (sections.length) {
      sections[sections.length - 1].blocks.push(block);
    } else {
      introduction.push(block);
    }
  }
  return (
    <div className="portable-copy backstory-copy">
      <PortableText value={introduction} />
      {sections.map((section) => (
        <details className="backstory-section" key={section.key}>
          <summary><h3>{section.title}</h3><span aria-hidden="true" className="backstory-section__indicator" /></summary>
          <div className="backstory-section__body"><PortableText value={section.blocks} /></div>
        </details>
      ))}
    </div>
  );
}
