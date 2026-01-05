import { UserConfig } from "./src/config"

const userConfig: UserConfig = {
    base_url: "https://prg-sh-notion-hugo.pages.dev",
    // Page-specific front matter overrides (by page ID)
    pageOverrides: {
        // About page - disable Table of Contents (no headings)
        "2dee1f04-2488-8164-a76e-d8ae287274a6": {
            showTableOfContents: false
        }
    },
    mount: {
        manual: false,
        page_url: 'https://watery-sapphire-0d4.notion.site/Notion-Hugo-2dee1f042488815e9c02db353ec3fcf0',
        pages: [
            // {
            //     page_id: '<page_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }
            {
                page_id: '45eb121158b9489480ec000fd25c812b',
                target_folder: '.'
            }
        ],
        databases: [
            // {
            //     database_id: '<database_id>',
            //     target_folder: 'path/relative/to/content/folder'
            // }
            {
                database_id: 'b7b1816c05ec464391c8c111fa242985',
                target_folder: '.'
            }
        ],
    }
}

export default userConfig;
