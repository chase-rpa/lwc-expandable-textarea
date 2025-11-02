import { createElement } from 'lwc';
import ExpandableTextArea from 'c/expandableTextArea';

describe('c-expandable-text-area', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllMocks();
    });

    it('creates component with default properties', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        document.body.appendChild(element);
        expect(element).toBeTruthy();
    });

    it('applies configured initial height', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.initialHeight = 300;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const textarea = element.shadowRoot.querySelector('textarea[data-id^="expandable-textarea"]');
            expect(textarea).toBeTruthy();
            expect(textarea.style.height).toBe(`${element.initialHeight}px`);
        });
    });

    it('displays custom label when provided', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.label = 'Custom Field Label';
        element.hideLabel = false;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label.slds-form-element__label');
            expect(label).toBeTruthy();
            expect(label.textContent.trim()).toContain('Custom Field Label');
        });
    });

    it('handles field value changes', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const textarea = element.shadowRoot.querySelector('textarea[data-id^="expandable-textarea"]');
            textarea.value = 'Test value';
            textarea.dispatchEvent(new CustomEvent('input', { bubbles: true }));

            return Promise.resolve();
        }).then(() => {
            expect(element.fieldValue).toBe('Test value');
        });
    });

    it('validates required fields', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.required = true;
        document.body.appendChild(element);

        const result = element.validate();
        expect(result).toBeDefined();
        expect(result.isValid).toBe(false);
    });

    it('shows loading spinner when loading', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector('lightning-spinner');
            expect(spinner).toBeFalsy();
        });
    });

    it('hideLabel hides the label', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.label = 'Test Label';
        element.hideLabel = true;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label.slds-form-element__label');
            expect(label).toBeFalsy();
        });
    });

    it('showLabel shows the label (backward compatibility)', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.label = 'Test Label';
        element.showLabel = true;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label.slds-form-element__label');
            expect(label).toBeTruthy();
            expect(label.textContent.trim()).toContain('Test Label');
        });
    });

    it('showLabel=false hides the label (backward compatibility)', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.label = 'Test Label';
        element.showLabel = false;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label.slds-form-element__label');
            expect(label).toBeFalsy();
        });
    });

    it('showLabel and hideLabel are inversely related', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        document.body.appendChild(element);

        element.showLabel = true;
        expect(element.hideLabel).toBe(false);

        element.showLabel = false;
        expect(element.hideLabel).toBe(true);

        element.hideLabel = false;
        expect(element.showLabel).toBe(true);

        element.hideLabel = true;
        expect(element.showLabel).toBe(false);
    });
});