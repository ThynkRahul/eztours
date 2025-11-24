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
      const link = links.find(l => l.key === linkKey);
      if (link) {
        return (
          <a key={index} href={link.url} className="text-[#025C7A] font-semibold underline">
            {text}
          </a>
        );
      }
    }
    return <span key={index}>{part}</span>;
  });
};

const isContentSection = (section: IBlogSection): section is IBlogSection & { content: string } => {
  return "content" in section;
};

const isBulletPointsSection = (
  section: IBlogSection
): section is IBlogSection & { bullet_points: (string | IBlogBulletPoint)[] } => {
  return "bullet_points" in section;
};

const isSubheadingsSection = (
  section: IBlogSection
): section is IBlogSection & { subheadings: IBlogSubheading[] } => {
  return "subheadings" in section;
};

const isBulletPoint = (point: string | IBlogBulletPoint): point is IBlogBulletPoint => {
  return typeof point === "object" && "content" in point;
};

export default function BlogDetail({ blogId, locale }: BlogDetailProps) {
  const blogData = getBlogTranslations(locale);
  const blog = blogData.find(item => item.url === blogId) as IBlogDataType | undefined;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!blog) {
    return <p>Blog not found</p>;
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="mt-[78px] sm:mt-[165px] mx-auto mb-12 max-w-[1200px] w-full px-4">
      <div className="py-6">
        <h1 className="text-[30px] text-left font-semibold mb-8 sm:text-[45px]">
          {blog.page_heading}
        </h1>

        {/* Hero Image */}
        <div className="relative w-full h-[250px] sm:h-[600px] rounded-[40px] overflow-hidden shadow-[0px_0px_2px_1px_#00000040] mb-8">
          <Image src={blog.image} alt={blog.title} fill className="object-cover" priority />
        </div>

        {/* Introduction */}
        <div className="prose prose-lg max-w-none mb-12">
          <p>
            {renderContent(blog.structure.introduction.content, blog.structure.introduction.links)}
          </p>
        </div>

        {/* Main Sections */}
        {blog.structure.main_sections.map((section, index) => (
          <div key={index} className="mb-12">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>

            {isContentSection(section) && (
              <div className="prose prose-lg max-w-none mb-6">
                <p>{renderContent(section.content, section.links)}</p>
              </div>
            )}

            {isBulletPointsSection(section) && (
              <ul className="list-disc pl-6 space-y-4">
                {section.bullet_points.map((point, pointIndex) => (
                  <li key={pointIndex} className="prose prose-lg max-w-none">
                    {isBulletPoint(point) ? (
                      <>
                        <strong>{point.title}</strong>
                        <p>{renderContent(point.content, section.links)}</p>
                      </>
                    ) : (
                      <span>{renderContent(point, section.links)}</span>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {isSubheadingsSection(section) && (
              <div className="space-y-6">
                {section.subheadings.map((subheading, subIndex) => (
                  <div key={subIndex}>
                    <h3 className="text-xl font-semibold mb-2">{subheading.title}</h3>
                    <p className="prose prose-lg max-w-none">{subheading.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Conclusion */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">{blog.structure.conclusion.heading}</h2>
          <div className="prose prose-lg max-w-none">
            <p>
              {renderContent(blog.structure.conclusion.content, blog.structure.conclusion.links)}
            </p>
          </div>
        </div>

        {/* FAQ Section as Accordion */}
        {blog.faq && blog.faq.length > 0 && (
          <div className="mt-16 max-w-[1200px] mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center text-[#000]">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {blog.faq.map((faqItem, index) => (
                <div
                  key={index}
                  className={`border rounded-2xl shadow-lg transition-shadow duration-300
                        ${openFaqIndex === index ? "shadow-[#025C7A]/40" : "shadow-gray-200 hover:shadow-[#025C7A]/30"}
                    `}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className={`
                            w-full flex justify-between items-center px-6 py-5 rounded-2xl
                            bg-gradient-to-r from-[#6E9753] to-[#6E9753]
                            focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6E9753]/60
                            transition-colors duration-300
                            ${openFaqIndex === index ? "text-[#fff] font-semibold" : "text-[#03475B] font-medium"}
                        `}
                    aria-expanded={openFaqIndex === index}
                    aria-controls={`faq-content-${index}`}
                    id={`faq-header-${index}`}
                  >
                    <span className="text-lg">{faqItem.question}</span>
                    <svg
                      className={`w-7 h-7 transform transition-transform duration-300
                                ${openFaqIndex === index ? "rotate-180 text-[#025C7A]" : "text-[#03475B]"}
                            `}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    id={`faq-content-${index}`}
                    role="region"
                    aria-labelledby={`faq-header-${index}`}
                    className={`transition-max-height duration-500 ease-in-out
                            overflow-hidden px-6 text-gray-700
                            ${openFaqIndex === index ? "max-h-[1000px] py-6" : "max-h-0"}
                        `}
                  >
                    <p className="leading-relaxed">{faqItem.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
