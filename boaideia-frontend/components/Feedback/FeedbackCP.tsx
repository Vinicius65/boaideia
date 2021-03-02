import { useContext, useEffect } from 'react';
import { FeedbackContext } from '../../services/context/feedbackContext';
import styles from './Feedback.module.css';

const dictColors = {
    'error': '#FF4040',
    'success': '#008000',
    'warning': '#ffff00'
}


export default function FeedbackCP() {
    const { feedback, setFeedback } = useContext(FeedbackContext);
    const { isVisible, title, message, type } = feedback;

    useEffect(() => {
        setTimeout(() => {
            setFeedback({
                isVisible: false,
                message: '',
                title: '',
                type: 'error'
            })

        }, 10000)
    }, [isVisible])

    if (!isVisible) return null;
    return (
        <div style={{ backgroundColor: dictColors[type] }} className={styles.container}>
            <h5>{title}</h5>
            <p>{message}</p>
        </div>
    )
}
