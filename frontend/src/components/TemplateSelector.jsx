import TemplateCard from "./TemplateCard";

function TemplateSelector({ templates, selectedTemplate, onSelect }) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          selected={selectedTemplate === template.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default TemplateSelector;
