import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class ExpandableTextArea extends LightningElement {
    @api recordId;
    @api objectApiName;
    @api fieldApiName;
    @api label;
    @api initialHeight = 200;
    @api minHeight = 100;
    @api maxHeight = 0;
    @api autoExpand = false;
    @api readOnly = false;
    @api showLabel = false;
    @api required = false;
    
    @track internalIsValid = false;
    @track internalFieldValue = '';
    @track currentValue = '';
    @track fieldLabel = '';
    @track fieldInfo = null;
    @track error = null;
    isLoading = true;
    
    get fieldToFetch() {
        return this.objectApiName && this.fieldApiName 
            ? `${this.objectApiName}.${this.fieldApiName}` 
            : null;
    }
    
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    wiredObjectInfo({ error, data }) {
        if (data) {
            if (data.fields[this.fieldApiName]) {
                this.fieldInfo = data.fields[this.fieldApiName];
                if (!this.label) {
                    this.fieldLabel = this.fieldInfo.label;
                }
            }
        } else if (error) {
            this.handleError('Error loading field metadata', error);
        }
    }
    
    @wire(getRecord, { 
        recordId: '$recordId', 
        fields: ['$fieldToFetch'] 
    })
    wiredRecord({ error, data }) {
        this.isLoading = false;
        if (data) {
            this.currentValue = data.fields[this.fieldApiName]?.value || '';
            
            if (this.internalFieldValue !== this.currentValue) {
                this.internalFieldValue = this.currentValue;
                this.notifyFlow();
            }
        } else if (error) {
            this.handleError('Error loading record', error);
        }
    }
    
    connectedCallback() {
        if (this.label) {
            this.fieldLabel = this.label;
        }
        
        if (!this.recordId && this.fieldValue) {
            this.currentValue = this.fieldValue;
            this.isLoading = false;
        }
        
        this.applyHeightStyling();
    }
    
    renderedCallback() {
        if (this.autoExpand && this.currentValue) {
            this.adjustHeight();
        }
    }
    
    handleChange(event) {
        this.currentValue = event.target.value;
        
        this.internalFieldValue = this.currentValue;
        this.notifyFlow();
        
        if (this.autoExpand) {
            this.adjustHeight(event);
        }
        
        this.validateField();
    }
    
    handleBlur() {
        if (this.recordId && !this.readOnly) {
            this.saveField();
        }
        
        this.validateField();
    }
    
    applyHeightStyling() {
        const style = document.createElement('style');
        style.textContent = `
            .configurable-textarea {
                --slds-c-textarea-sizing-min-height: ${this.minHeight}px;
                --slds-c-textarea-sizing-height: ${this.initialHeight}px;
                ${this.maxHeight > 0 ? `--slds-c-textarea-sizing-max-height: ${this.maxHeight}px;` : ''}
            }
        `;
        this.template.appendChild(style);
    }
    
    adjustHeight(event) {
        const textarea = event ? event.target : this.template.querySelector('lightning-textarea');
        if (textarea) {
            const textareaElement = textarea.querySelector('textarea');
            if (textareaElement) {
                textareaElement.style.height = 'auto';
                const newHeight = Math.max(
                    this.minHeight,
                    Math.min(
                        textareaElement.scrollHeight,
                        this.maxHeight > 0 ? this.maxHeight : Infinity
                    )
                );
                textareaElement.style.height = newHeight + 'px';
            }
        }
    }
    
    async saveField() {
        try {
            const fields = {};
            fields.Id = this.recordId;
            fields[this.fieldApiName] = this.currentValue;
            
            await updateRecord({ fields });
            
            this.showToast('Success', 'Field updated successfully', 'success');
        } catch (error) {
            this.handleError('Error saving field', error);
        }
    }
    
    validateField() {
        const textarea = this.template.querySelector('lightning-textarea');
        if (textarea) {
            this.internalIsValid = textarea.reportValidity();
            this.notifyFlow();
        }
        return this.internalIsValid;
    }
    
    notifyFlow() {
        this.dispatchEvent(new FlowAttributeChangeEvent('fieldValue', this.internalFieldValue));
        this.dispatchEvent(new FlowAttributeChangeEvent('isValid', this.internalIsValid));
    }
    
    handleError(title, error) {
        console.error(title, error);
        this.error = error;
        this.showToast('Error', error.body?.message || 'An error occurred', 'error');
    }
    
    showToast(title, message, variant) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            })
        );
    }
    
    @api validate() {
        const isValid = this.validateField();
        
        if (isValid) {
            return { isValid: true };
        }
        
        return {
            isValid: false,
            errorMessage: 'Please complete this required field.'
        };
    }
    
    @api
    get fieldValue() {
        return this.internalFieldValue;
    }
    
    set fieldValue(value) {
        this.internalFieldValue = value;
        this.currentValue = value;
    }
    
    @api
    get isValid() {
        return this.internalIsValid;
    }
    
    get displayLabel() {
        return this.showLabel ? (this.fieldLabel || this.label || 'Field') : '';
    }
    
    get textareaClass() {
        return `configurable-textarea ${this.autoExpand ? 'auto-expand' : ''}`;
    }
    
    get isFieldAccessible() {
        return this.fieldInfo?.updateable || !this.readOnly;
    }
    
    get isRequired() {
        return this.required || this.fieldInfo?.required;
    }
    
    get maxLengthValue() {
        return this.fieldInfo?.length || 131072;
    }
}