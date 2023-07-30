// import './Settings.scss'
import axios from './Interceptor/Interceptor'
import { useSelector } from 'react-redux'
import { useEffect, useState, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store/store'
import { motion, AnimatePresence } from 'framer-motion'



function Secure(props: any) {
    const [Code, setCode] = useState<number[]>([-1, -1, -1, -1, -1, -1]);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isValidate, setValidate] = useState<null | boolean>(null);
    const RenderInputs = () => {
        const inputs = [];

        for (let i = 0; i < 6; i++) {
            inputs.push(
                <div className={isValidate === false ? "numberInput codeAni" : "numberInput"} key={`numberInput-${i}`}>
                    <input
                        ref={(ref) => (inputRefs.current[i] = ref)}
                        onChange={(e: any) => handleChange(e, i)}
                        type="number"
                        name={`number-${i}`}
                        id=""
                        maxLength={1}
                        placeholder="0"
                        onKeyDown={(e: any) => handleKeyDown(e, i)}
                    />
                </div>
            );
        }

        return inputs;
    };

    const handleChange = (e: any, i: number) => {
        if (e.target.value !== '') {

            e.target.value = e.target.value[e.target.value.length - 1];
            const tmp = [...Code];
            tmp[i] = parseInt(e.target.value, 10);
            setCode(tmp);

            if (inputRefs.current[i + 1]?.focus) {
                inputRefs.current[i + 1]?.focus();
            }
        }
    };
    const handleKeyDown = (e: any, i: number) => {
        if (i > 0 && e.key === 'Backspace') {
            e.preventDefault(); // Prevent the default backspace behavior
            e.target.value = '';
            const tmp = [...Code];
            tmp[i] = -1;
            setCode(tmp);

            if (inputRefs.current[i - 1]?.focus) {
                inputRefs.current[i - 1]?.focus(); // Focus on the previous input field if it exists
            }
        }
    };
    return (
        <AnimatePresence mode='wait'>
            <motion.div
                key='secure'
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                className="securePage">
                {
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        key={'Block-Side'}
                        transition={{ ease: "easeInOut", duration: 0.2 }}
                    >
                        <div className="twoFa">
                            <div className="twoFA-cont">
                                <h1>Account Secure</h1>
                                <div className="main2FA">
                                    {
                                        <div className="codeGenerating">{RenderInputs()}</div>
                                    }
                                </div>
                                <div className="footer-2fa">
                                    <button onClick={() => {
                                        if (!Code.includes(-1)) {
                                            const CodeGenerator = Code.join('');
                                            const SendData = async () => {
                                                await axios.post('/auth/verify-2fa', { Code: CodeGenerator }).then((resp) => {
                                                    setValidate(resp.data);
                                                    if (resp.data === true) {
                                                        props.setSec(false);
                                                    }
                                                });
                                            }
                                            SendData();
                                        }

                                    }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                }

            </motion.div>
        </AnimatePresence>
    )
}
export default Secure;