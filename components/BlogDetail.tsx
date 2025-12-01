"use client";

import React, { useState } from "react";
import Image from "next/image";

import {
  IBlogDataType,
  IBlogLinks,
  IBlogSection,
  IBlogBulletPoint,
  IBlogSubheading,
} from "../types/Common";
import { getBlogTranslations } from "../lib/translationHelper";

interface BlogDetailProps {
  blogId?: string;
  locale: string;
}

const renderContent = (content: string, links?: IBlogLinks) => {
  if (!links || links.length === 0) return content;

  const parts = content.split(/({{LINK:[^:]+:[^}]+}})/g);

  return parts.map((part, index) => {
    const match = part.match(/{{LINK:([^:]+):([^}]+)}}/);
    if (match) {
      const [, linkKey, text] = match;
      const link = links.find((l) => l.key === linkKey);

      if (link) {
        return (
          <a
            key={index}
            href={link.url}
            className="text-[#025C7A] font-semibold underline"
          >
            {text}
          </a>
        );
      }
    }

    return <span key={index}>{part}</span>;
  });
};

const isContentSection = (
  section: IBlogSection
): section is IBlogSection & { content: string } => "content" in section;

const isBulletPointsSection = (
  section: IBlogSection
): section is IBlogSection & { bullet_points: (string | IBlogBulletPoint)[] } =>
  "bullet_points" in section;

const isSubheadingsSection = (
  section: IBlogSection
): section is IBlogSection & { subheadings: IBlogSubheading[] } =>
  "subheadings" in section;

const isBulletPoint = (
  point: string | IBlogBulletPoint
): point is IBlogBulletPoint => typeof point === "object" && "content" in point;

export default function BlogDetail({ blogId, locale }: BlogDetailProps) {
  const blogData = getBlogTranslations(locale);
  const blog = blogData.find((item) => item.url === blogId) as
    | IBlogDataType
    | undefined;

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!blog) return <p>Blog not found</p>;

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
      <div className="py-6">
        {/* PAGE HEADING */}
        <h1 className="text-[30px] text-left font-semibold mb-8 sm:text-[45px]">
          {blog.page_heading}
        </h1>

        {/* HERO IMAGE */}
        <div className="relative w-full h-[250px] sm:h-[600px] rounded-[40px] overflow-hidden shadow mb-8">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* INTRODUCTION */}
        {blog.structure.introduction.heading && (
          <h2 className="text-2xl font-semibold mb-4">
            {blog.structure.introduction.heading}
          </h2>
        )}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            {renderContent(
              blog.structure.introduction.content,
              blog.structure.introduction.links
            )}
          </p>
        </div>

        {/* MAIN SECTIONS */}
        {blog.structure.main_sections.map((section, index) => (
          <div key={index} className="mb-12">
            {/* Heading Before Section */}
            {section.heading_before && (
              <p className="text-xl font-medium text-gray-600 mb-2">
                {section.heading_before}
              </p>
            )}

            {/* Section Heading */}
            {section.heading && (
              <h2 className="text-3xl font-semibold mb-4">{section.heading}</h2>
            )}

            {/* Section Image */}
            {section.image && (
              <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow mb-6">
                <Image
                  src={section.image}
                  alt={section.heading}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            {isContentSection(section) && (
              <div className="prose prose-lg max-w-none mb-6">
                <p>{renderContent(section.content, section.links)}</p>
              </div>
            )}

            {/* Bullet Points */}
            {isBulletPointsSection(section) && (
              <ul className="list-disc pl-6 space-y-3">
                {section.bullet_points.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    {isBulletPoint(point) ? (
                      <>
                        {point.title && <strong>{point.title}: </strong>}
                        <span>{renderContent(point.content, section.links)}</span>
                      </>
                    ) : (
                      <span>{renderContent(point, section.links)}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* Subheadings */}
            {isSubheadingsSection(section) &&
              section.subheadings.map((sub, i) => (
                <div key={i} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{sub.title}</h3>

                  {sub.content && (
                    <p>{renderContent(sub.content, sub.links)}</p>
                  )}

                  {sub.bullet_points && (
                    <ul className="list-disc pl-6 space-y-2">
                      {sub.bullet_points.map((b, idx) => {
                        const isBullet = typeof b === "object" && "content" in b;
                        return (
                          <li key={idx}>
                            {isBullet ? (
                              <>
                                {b.title && <strong>{b.title}: </strong>}
                                <span>{renderContent(b.content, b.links ?? sub.links)}</span>
                              </>
                            ) : (
                              <span>{renderContent(b as string, sub.links)}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        ))}

        {/* CONCLUSION */}
        <div className="mt-16">
          {blog.structure.conclusion.heading && (
            <h2 className="text-2xl font-semibold mb-4">
              {blog.structure.conclusion.heading}
            </h2>
          )}
          <p>
            {renderContent(
              blog.structure.conclusion.content,
              blog.structure.conclusion.links
            )}
          </p>
        </div>

        {/* FAQ */}
        {blog.faq && blog.faq.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-6">
              Frequently Asked Questions
            </h2>

            {blog.faq.map((faqItem, index) => (
              <div key={index} className="border rounded-xl shadow p-4 mb-4">
                <button
                  className="w-full text-left font-semibold mb-2"
                  onClick={() => toggleFaq(index)}
                >
                  {faqItem.question}
                </button>

                {openFaqIndex === index && (
                  <p className="text-gray-600">{faqItem.answer}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
