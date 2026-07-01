'use client';

/**
 * SWARAYA · <Field /> — Input + textarea unificados.
 *
 * Un solo componente con variante `multiline`. Estados semánticos:
 *  default / focus / error / disabled.
 *
 * Accesibilidad:
 *  - min-height 44px
 *  - placeholder color #646E7B (4.63:1)
 *  - `aria-invalid` cuando `error` es truthy
 *  - `aria-describedby` conecta con field-error-text
 *  - foco visible por el `:focus-visible` global + border indigo
 */

import { forwardRef, useId } from 'react';

const Field = forwardRef(function Field(
  {
    label,
    id,
    multiline = false,
    error,
    hint,
    className = '',
    style,
    ...rest
  },
  ref,
) {
  const auto = useId();
  const fieldId = id ?? auto;
  const errorId = error ? `${fieldId}-error` : undefined;
  const hintId  = hint  ? `${fieldId}-hint`  : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  const Cmp = multiline ? 'textarea' : 'input';

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label ? (
        <label
          htmlFor={fieldId}
          className="text-[0.6875rem] uppercase tracking-[0.18em]"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            color: 'var(--text-tertiary)',
          }}
        >
          {label}
        </label>
      ) : null}
      <Cmp
        ref={ref}
        id={fieldId}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className="field"
        style={{
          resize: multiline ? 'vertical' : undefined,
          minHeight: multiline ? 120 : 44,
          ...style,
        }}
        {...rest}
      />
      {hint && !error ? (
        <span id={hintId} className="text-[0.8125rem]" style={{ color: 'var(--text-secondary)' }}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="field-error-text">
          {error}
        </span>
      ) : null}
    </div>
  );
});

export default Field;
