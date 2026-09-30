import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function ModernSelect({
  label,
  value,
  onChange,
  options = [],
  icon: Icon,
  placeholder = 'Pilih Opsi',
  style = {},
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Normalize options to object format { value, label, sublabel, icon }
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === 'string') {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value) || {
    value,
    label: value || placeholder
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange && onChange(val);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`modern-select-wrapper ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '160px',
        ...style
      }}
    >
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: '0.75rem',
            color: '#68717C',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.35rem'
          }}
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.65rem',
          backgroundColor: '#FFFFFF',
          border: isOpen ? '1.5px solid #101C2C' : '1px solid #E5E7E2',
          borderRadius: '12px',
          padding: '0.65rem 0.95rem',
          color: '#101C2C',
          fontSize: '0.88rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: isOpen ? '0 0 0 3px rgba(16, 28, 44, 0.08)' : '0 2px 6px rgba(16, 28, 44, 0.04)',
          transition: 'all 0.2s ease',
          minHeight: '44px',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', overflow: 'hidden' }}>
          {Icon && (
            <Icon
              size={16}
              color="#101C2C"
              style={{ flexShrink: 0 }}
            />
          )}
          <span
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color: '#101C2C'
            }}
          >
            {selectedOption.label}
          </span>
        </div>

        <ChevronDown
          size={16}
          color="#68717C"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            minWidth: '220px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E7E2',
            borderRadius: '14px',
            boxShadow: '0 12px 30px rgba(16, 28, 44, 0.12)',
            padding: '0.45rem',
            zIndex: 1000,
            maxHeight: '280px',
            overflowY: 'auto'
          }}
        >
          {normalizedOptions.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.65rem',
                  backgroundColor: isSelected ? '#101C2C' : 'transparent',
                  color: isSelected ? '#FFFFFF' : '#101C2C',
                  fontWeight: isSelected ? '700' : '500',
                  fontSize: '0.86rem',
                  transition: 'all 0.15s ease',
                  marginBottom: '2px'
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = '#F0F2EB';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {opt.icon && <opt.icon size={15} color={isSelected ? '#DFFF00' : '#68717C'} />}
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check size={16} color="#DFFF00" style={{ flexShrink: 0 }} />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
