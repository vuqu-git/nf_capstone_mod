import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function DTpicker() {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
    );
}