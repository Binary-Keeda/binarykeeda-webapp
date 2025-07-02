import CodeBlock from "./CodeBlock";
import MCQQuestion from "./MCQQuestion";
import VideoTutorial from "./VideoTutorial";
import DataTable from "./DataTable";

const Content = ({ sections }) => {
  let heading1Count = 0;
  let heading2Count = 0;
  let latestHeading1Id = "";

  return (
    <div className="prose custom-prose max-w-5xl mx-auto font-sans text-gray-800 prose-headings:font-semibold prose-h1:mt-[50px] prose-h2:mt-[40px] prose-h1:text-[35px] prose-h2:text-[27px] prose-h3:text-[24px] prose-p:text-[17px] prose-li:text-[16px] leading-relaxed prose-img:rounded-lg prose-img:shadow-md prose-ul:pl-6 prose-ul:list-disc">
      {sections.map((section, i) => {
        switch (section.type) {
          case "heading1": {
            heading1Count++;
            heading2Count = 0;
            const id = `heading${heading1Count}`;
            section.id = id;
            latestHeading1Id = id;
            return (
              <h1 key={i} id={id} className="scroll-mt-24">
                {section.text}
              </h1>
            );
          }

          case "heading2": {
            heading2Count++;
            const id = `${latestHeading1Id}-${heading2Count}`;
            section.id = id;
            return (
              <h2 key={i} id={id} className="scroll-mt-24">
                {section.text}
              </h2>
            );
          }

          case "paragraph":
            return <p key={i}>{section.text}</p>;

          case "code":
            return (
              <CodeBlock
                key={i}
                code={section.code}
                language={section.language || "python"}
              />
            );

          case "list":
            return (
              <ul key={i}>
                {section.items.map((item, j) => (
                  <li key={j}>
                    <strong>{item.label}:</strong>{" "}
                    {item.desc.startsWith("https") ? (
                      <a
                        href={item.desc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {item.desc}
                      </a>
                    ) : (
                      item.desc
                    )}
                  </li>
                ))}
              </ul>
            );

          case "video":
            return (
              <VideoTutorial
                key={i}
                title={section.title}
                videoUrl={section.url}
                description={section.description}
              />
            );

          case "mcq":
            return (
              <MCQQuestion
                key={i}
                question={section.question}
                code={section.code}
                options={section.options}
                correctIndex={section.correctIndex}
              />
            );

          case "table":
            return (
              <DataTable
                key={i}
                headers={section.headers}
                rows={section.rows}
              />
            );

          case "image":
            return (
              <img
                key={i}
                src={section.src}
                alt={section.alt}
                className="rounded shadow"
              />
            );

          case "quote":
            return (
              <blockquote key={i} className="italic border-l-4 pl-4">
                {section.text}
              </blockquote>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default Content;
