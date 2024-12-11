import React, { useState } from 'react';
// import axios from 'axios';
import axios from '../axios'
function EventForm() {
    const [surgeryName, setSurgeryName] = useState('');
    const [organizerName, setOrganizerName] = useState('');
    const [patientName, setPatientName] = useState('');
    const [eventId, setEventId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/create-events', {
                surgeryName,
                organizerName,
                patientName
            });
            
            // 保存返回的event_id
            setEventId(response.data);
            
            // 可选：重置表单
            setSurgeryName('');
            setOrganizerName('');
            setPatientName('');
        } catch (error) {
            console.error('提交事件失败:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="手术名称"
                    value={surgeryName}
                    onChange={(e) => setSurgeryName(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="医生名称"
                    value={organizerName}
                    onChange={(e) => setOrganizerName(e.target.value)}
                    required
                />
                <input 
                    type="text"
                    placeholder="患者名称"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                />
                <button type="submit">提交事件</button>
            </form>
            {eventId && <p>事件ID: {eventId}</p>}
        </div>
    );
}

export default EventForm;