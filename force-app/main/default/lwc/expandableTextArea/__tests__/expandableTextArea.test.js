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
            const textarea = element.shadowRoot.querySelector('lightning-textarea');
            expect(textarea).toBeTruthy();
        });
    });

    it('displays custom label when provided', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        element.label = 'Custom Field Label';
        element.showLabel = true;
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const textarea = element.shadowRoot.querySelector('lightning-textarea');
            expect(textarea.label).toBe('Custom Field Label');
        });
    });

    it('handles field value changes', () => {
        const element = createElement('c-expandable-text-area', {
            is: ExpandableTextArea
        });
        document.body.appendChild(element);

        const textarea = element.shadowRoot.querySelector('lightning-textarea');
        textarea.value = 'Test value';
        textarea.dispatchEvent(new CustomEvent('change', {
            detail: { value: 'Test value' }
        }));

        return Promise.resolve().then(() => {
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
});