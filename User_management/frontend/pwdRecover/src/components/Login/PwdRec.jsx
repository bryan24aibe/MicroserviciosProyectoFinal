import './PwdRec.css';
import { useState } from 'react';

const PwdRec = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState(1);

    const requestReset = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/request-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email }),
            });

            const result = await response.text();

            if (response.ok) {
                console.log(result.replace('✅ Recovery code generated: ', ''));
                setStep(2);
            } else {
                alert(result || 'Error requesting password reset.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ email, code, password }),
            });

            const result = await response.text();

            if (response.ok) {
                console.clear();
                alert('Password successfully changed.');
                setStep(1);
                setEmail('');
                setPassword('');
                setCode('');
            } else {
                alert(result || 'Error resetting password.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="pwdrec-container">
            {step === 1 ? (
                <form className="custom-form" onSubmit={requestReset}>
                    <h2>Request Password Reset</h2>
                    <div className="input-group">
                        <label className="custom-label">Email:</label>
                        <input
                            type="email"
                            className="custom-input"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button className="custom-button" type="submit">Request Reset</button>
                </form>
            ) : (
                <form className="custom-form" onSubmit={resetPassword}>
                    <h2>Reset Your Password</h2>
                    <div className="input-group">
                        <label className="custom-label">Recovery Code:</label>
                        <input
                            type="text"
                            className="custom-input"
                            placeholder="Enter the code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label className="custom-label">New Password:</label>
                        <input
                            type="password"
                            className="custom-input"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="custom-button" type="submit">Reset Password</button>
                </form>
            )}
        </div>
    );
};

export default PwdRec;