import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  UserIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  TagIcon,
  CalendarIcon,
  StarIcon
} from '@heroicons/react/24/outline'

interface CreateLeadModalProps {
  isOpen: boolean
  onClose: () => void
}

interface LeadFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  industry: string
  companySize: string
  location: string
  source: string
  priority: string
  dealValue: string
  notes: string
  tags: string[]
  nextFollowUpDate: string
}

const initialFormData: LeadFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  position: '',
  industry: '',
  companySize: '',
  location: '',
  source: '',
  priority: 'medium',
  dealValue: '',
  notes: '',
  tags: [],
  nextFollowUpDate: ''
}

const industries = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 
  'Manufacturing', 'Real Estate', 'Consulting', 'Other'
]

const companySizes = [
  '1-10 employees', '11-50 employees', '51-200 employees', 
  '201-1000 employees', '1000+ employees'
]

const sources = [
  'Website', 'Referral', 'Social Media', 'Email Campaign', 
  'Cold Call', 'Trade Show', 'Partner', 'Other'
]

const priorities = [
  { value: 'low', label: 'Low', color: 'bg-primary-100 text-primary-800' },
  { value: 'medium', label: 'Medium', color: 'bg-warning-100 text-warning-800' },
  { value: 'high', label: 'High', color: 'bg-error-100 text-error-800' }
]

const CreateLeadModal = ({ isOpen, onClose }: CreateLeadModalProps) => {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData)
  const [currentTag, setCurrentTag] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }))
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Here you would typically make an API call to create the lead
      console.log('Creating lead:', formData)
      
      // Reset form and close modal
      setFormData(initialFormData)
      onClose()
    } catch (error) {
      console.error('Error creating lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData(initialFormData)
      setErrors({})
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white dark:bg-primary-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary-200 dark:border-primary-700">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                  <UserIcon className="w-6 h-6 text-accent-600 dark:text-accent-400" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-primary-900 dark:text-primary-100">
                    Add New Lead
                  </h2>
                  <p className="text-sm text-primary-600 dark:text-primary-400">
                    Enter lead information to add them to your pipeline
                  </p>
                </div>
              </div>
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="p-2 text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors rounded-lg hover:bg-primary-100 dark:hover:bg-primary-700"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4 flex items-center space-x-2">
                  <UserIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  <span>Personal Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className={`input ${errors.firstName ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className={`input ${errors.lastName ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`input ${errors.email ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Company Information */}
              <div>
                <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4 flex items-center space-x-2">
                  <BuildingOfficeIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  <span>Company Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Company *
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`input ${errors.company ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
                      placeholder="Company name"
                    />
                    {errors.company && (
                      <p className="mt-1 text-sm text-error-600 dark:text-error-400">{errors.company}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => handleInputChange('position', e.target.value)}
                      className="input"
                      placeholder="Job title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="input"
                    >
                      <option value="">Select industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry.toLowerCase()}>{industry}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Company Size
                    </label>
                    <select
                      value={formData.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="input"
                    >
                      <option value="">Select company size</option>
                      {companySizes.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="input"
                      placeholder="City, State, Country"
                    />
                  </div>
                </div>
              </div>

              {/* Lead Details */}
              <div>
                <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100 mb-4 flex items-center space-x-2">
                  <StarIcon className="w-5 h-5 text-accent-600 dark:text-accent-400" />
                  <span>Lead Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Source
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => handleInputChange('source', e.target.value)}
                      className="input"
                    >
                      <option value="">Select source</option>
                      {sources.map(source => (
                        <option key={source} value={source.toLowerCase().replace(' ', '_')}>{source}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Priority
                    </label>
                    <div className="flex space-x-2">
                      {priorities.map(priority => (
                        <button
                          key={priority.value}
                          type="button"
                          onClick={() => handleInputChange('priority', priority.value)}
                          className={`flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-colors ${
                            formData.priority === priority.value
                              ? `${priority.color} border-current`
                              : 'border-primary-300 dark:border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-800'
                          }`}
                        >
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Potential Deal Value
                    </label>
                    <input
                      type="number"
                      value={formData.dealValue}
                      onChange={(e) => handleInputChange('dealValue', e.target.value)}
                      className="input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                      Next Follow-up Date
                    </label>
                    <input
                      type="date"
                      value={formData.nextFollowUpDate}
                      onChange={(e) => handleInputChange('nextFollowUpDate', e.target.value)}
                      className="input"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 text-sm bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-accent-500 hover:text-accent-700"
                      >
                        <XMarkIcon className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentTag}
                    onChange={(e) => setCurrentTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="input flex-1"
                    placeholder="Enter a tag and press Enter"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="btn-secondary"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-medium text-primary-700 dark:text-primary-300 mb-2">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="input min-h-[100px] resize-y"
                  placeholder="Add any additional notes about this lead..."
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 border-t border-primary-200 dark:border-primary-700">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Creating...' : 'Create Lead'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CreateLeadModal