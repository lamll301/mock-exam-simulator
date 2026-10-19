interface LiveSwitchProps {
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
}

/** Công tắc bật/tắt, thay cho switchery của template (JS đó không chạy trong React) */
export default function LiveSwitch({ checked, onChange, label = 'Live update:' }: LiveSwitchProps) {
  return (
    <label className="d-flex align-items-center mb-0" style={{ cursor: 'pointer' }}>
      <span className="mr-2">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="d-flex align-items-center border-0"
        style={{
          width: 38,
          height: 22,
          borderRadius: 11,
          padding: 2,
          background: checked ? '#4CAF50' : '#ddd',
          justifyContent: checked ? 'flex-end' : 'flex-start',
          transition: 'background .2s',
        }}
      >
        <span style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,.3)' }} />
      </button>
    </label>
  )
}