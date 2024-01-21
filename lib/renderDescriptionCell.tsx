import { PartialBlock, PartialInlineContent } from "@blocknote/core";

export const renderDescriptionCell = (description: string) => {
    try {
        const descriptionObject = JSON.parse(description) as PartialBlock[]

        const contentValue = descriptionObject.map((block) => {
            if (block.type === "paragraph") {
                if (block.content === undefined || typeof block.content === 'string') return null;
                return block.content.map((content) => {
                    if (content.type === "text") {
                        return content.text
                    } else {
                        return null;
                    }
                }).join(" ");
            } else {
                return null
            }
        });
        
        return (
            <p className="text-sm text-muted-foreground">
                {contentValue.length > 5 ? contentValue.slice(0, 5).join(" ") + "..." : contentValue.join(" ")}
            </p>
        );
    } catch (error) {
        console.error('Błąd parsowania JSON:', error);
        // Obsługa błędu parsowania
        return null;
    }
};

const renderInlineContent = (inlineContent: PartialInlineContent[]) => {
    return inlineContent.map((inlineContent) => {
        if (inlineContent.type === "text") {
            return inlineContent.text
        } else {
            return null;
        }
    });
}