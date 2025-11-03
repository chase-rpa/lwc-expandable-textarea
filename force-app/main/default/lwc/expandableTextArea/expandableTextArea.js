import { LightningElement, api, wire, track } from 'lwc';
import { getRecord, updateRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

console.log('============================================');
console.log('[expandableTextArea] MODULE LOADED - Component file is being used');
console.log('============================================');

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
    @api required = false;
    
    _hideLabel = false;
    
    @api
    get hideLabel() {
        return this._hideLabel;
    }
    
    set hideLabel(value) {
        this._hideLabel = value === true || (typeof value === 'string' && value.toLowerCase() === 'true');
    }
    
    @api availableActions = [];
    @api screenHelpText;
    @api navigateFlow;
    @api ariaDescribedBy;
    @api ariaLabel;
    
    @track internalIsValid = false;
    @track internalFieldValue = '';
    @track currentValue = '';
    @track fieldLabel = '';
    @track fieldInfo = null;
    @track error = null;
    @track validationError = '';
    @track externalValidationError = '';
    @track hasUserInteracted = false;
    isLoading = true;
    hasInitializedHeight = false;
    
    get fieldToFetch() {
        if (!this.objectApiName || !this.fieldApiName) {
            return [];
        }
        return [`${this.objectApiName}.${this.fieldApiName}`];
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
        fields: '$fieldToFetch'
    })
    wiredRecord({ error, data }) {
        this.isLoading = false;
        if (data) {
            const newValue = data.fields[this.fieldApiName]?.value || '';
            console.log('[expandableTextArea] wiredRecord - newValue:', newValue);
            console.log('[expandableTextArea] wiredRecord - newValue length:', newValue?.length);
            
            // Reset the flag if we're getting new content for the first time
            if (newValue && newValue.length > 0 && !this.currentValue) {
                console.log('[expandableTextArea] wiredRecord - resetting hasInitializedHeight because we have content now');
                this.hasInitializedHeight = false;
            }
            
            this.currentValue = newValue;
            
            // Trigger height adjustment when record data updates
            const textarea = this.template.querySelector('textarea[data-id^="expandable-textarea"]');
            if (textarea) {
                this.adjustTextareaHeight(textarea);
            }
            
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
        
        if (!this.recordId) {
            if (this.fieldValue) {
                this.currentValue = this.fieldValue;
            }
            this.isLoading = false;
        }
        
        this.hasUserInteracted = false;
    }
    
    renderedCallback() {
        if (!this.hasInitializedHeight) {
            const textarea = this.template.querySelector('textarea[data-id^="expandable-textarea"]');
            if (textarea) {
                this.hasInitializedHeight = true;
                this.adjustTextareaHeight(textarea);
            }
        }
    }
    
    adjustTextareaHeight(textarea) {
        if (!textarea) return;
        
        textarea.style.overflowY = 'hidden';
        textarea.style.height = 'auto';
        
        const scrollHeight = textarea.scrollHeight;
        const desiredHeight = this.autoExpand ? scrollHeight : this.initialHeight;
        
        const calculatedHeight = Math.max(
            this.minHeight,
            this.maxHeight > 0 ? Math.min(desiredHeight, this.maxHeight) : desiredHeight
        );
        
        textarea.style.height = calculatedHeight + 'px';
        
        // Set overflow when content exceeds calculated height
        if (textarea.scrollHeight > calculatedHeight) {
            textarea.style.overflowY = 'auto';
        }
    }
    
    handleInput(event) {
        const value = event.target.value;
        const textarea = event.target;
        this.hasUserInteracted = true;
        
        this.currentValue = value;
        this.internalFieldValue = value;
        
        this.adjustTextareaHeight(textarea);
        this.notifyFlow();
    }
    
    handleChange(event) {
        this.currentValue = event.target.value;
        this.internalFieldValue = this.currentValue;
        
        this.validateField();
    }
    
    handleBlur() {
        this.validateField();
        
        if (this.recordId && !this.isReadOnlyComputed && this.internalIsValid) {
            this.saveField();
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
    
    performValidation(value) {
        if (this.readOnly) {
            return { isValid: true, errorMessage: '' };
        }
        
        if (this.isRequired && (!value || value.trim() === '')) {
            return { isValid: false, errorMessage: 'Complete this required field.' };
        }
        
        if (value && value.length > this.maxLengthValue) {
            return {
                isValid: false,
                errorMessage: `Value exceeds maximum length of ${this.maxLengthValue} characters.`
            };
        }
        
        return { isValid: true, errorMessage: '' };
    }
    
    validateField() {
        const currentValue = this.recordId ? this.currentValue : this.internalFieldValue;
        
        const result = this.performValidation(currentValue);
        this.validationError = result.errorMessage;
        this.internalIsValid = result.isValid && !this.externalValidationError;
        this.notifyFlow();
        
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
        this.validateField();
        
        if (this.internalIsValid) {
            return { isValid: true };
        }
        
        return {
            isValid: false,
            errorMessage: this.computedErrorMessage
        };
    }
    
    @api setCustomValidity(externalMessage) {
        this.externalValidationError = externalMessage || '';
    }
    
    @api reportValidity() {
        this.hasUserInteracted = true;
        this.validateField();
        return this.internalIsValid;
    }
    
    @api
    get fieldValue() {
        return this.internalFieldValue;
    }
    
    set fieldValue(value) {
        this.internalFieldValue = value;
        this.currentValue = value;
        this.validationError = '';
        this.externalValidationError = '';
        
        const textarea = this.template.querySelector('textarea[data-id^="expandable-textarea"]');
        if (textarea) {
            this.adjustTextareaHeight(textarea);
        }
        
        this.validateField();
    }
    
    @api
    get isValid() {
        return this.internalIsValid;
    }
    
    get displayLabel() {
        return !this._hideLabel ? (this.fieldLabel || this.label || 'Field') : '';
    }
    
    get computedAriaLabel() {
        if (this.ariaLabel) {
            return this.ariaLabel;
        }
        return this._hideLabel ? (this.fieldLabel || this.label || 'Field') : undefined;
    }
    
    get isReadOnlyComputed() {
        return this.readOnly || (this.fieldInfo && !this.fieldInfo.updateable);
    }
    
    get isRequired() {
        return this.required || this.fieldInfo?.required;
    }
    
    get maxLengthValue() {
        return this.fieldInfo?.length || 131072;
    }
    
    get hasError() {
        return !!this.validationError || !!this.externalValidationError;
    }
    
    get computedErrorMessage() {
        return this.externalValidationError || this.validationError;
    }
    
    get formElementClass() {
        return 'slds-form-element' + (this.hasError ? ' slds-has-error' : '');
    }
    
    get isInvalid() {
        return this.hasError;
    }
    
    get errorHelpId() {
        return this.recordId ? 'error-with-record' : 'error-flow';
    }
    
    get computedAriaDescribedBy() {
        return this.ariaDescribedBy || (this.hasError ? this.errorHelpId : undefined);
    }
}