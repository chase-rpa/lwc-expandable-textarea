export class FlowAttributeChangeEvent extends CustomEvent {
    constructor(attributeName, attributeValue) {
        super('lightning__flowattributechange', {
            composed: true,
            cancelable: false,
            bubbles: true,
            detail: {
                attributeName,
                attributeValue
            }
        });
    }
}