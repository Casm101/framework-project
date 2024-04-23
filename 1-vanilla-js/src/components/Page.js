/**
 * Page component
 */
export class Page {
    title = '';
    description = '';
    template = '';

    /**
     * Constructor for the page component
     */
    constructor(
        template,
        title = 'Framework Movies',
        description = 'A site to find the best movies around!'
    ) {
        this.title = title;
        this.description = description;
        this.template = template;
    };

    /**
     * Method to set the document title
     */
    setTitle() {
        document.title = this.title
    };

    /**
     * Method to set the document description
     */
    setDescription() {
        const siteDescription = document.querySelector('meta[name="description"]');
        siteDescription.setAttribute('content', this.description);
    };

    /**
     * Method to set all document meta data at once
     */
    setMeta() {
        this.setTitle();
        this.setDescription();
    };

    /**
     * Method to render page component
     * @returns string
     */
    render() {
        this.setMeta();
        return this.template;
    };
};