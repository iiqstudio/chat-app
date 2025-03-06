import { useEffect, useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Paper, styled, useMediaQuery } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

interface BubbleProps {
    isUser: boolean;
    children: React.ReactNode;
}

const Bubble = styled(Paper)<BubbleProps>(({ theme, isUser }: any) => ({
    maxWidth: '75%',
    alignSelf: isUser ? 'flex-end' : 'flex-start',
    backgroundColor: isUser ? theme.palette.primary.main : theme.palette.grey[300],
    color: isUser ? theme.palette.common.white : theme.palette.text.primary,
    padding: theme.spacing(1.5),
    borderRadius: '16px',
    wordBreak: 'break-word',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    ...(isUser ? { borderTopRightRadius: '4px' } : { borderTopLeftRadius: '4px' }), // Скругление углов
}));

const Chat = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! How can I assist you today?", user: false },
    ]);
    const [inputValue, setInputValue] = useState('');
    const chatWindowRef = useRef(null);


    const isMobile = useMediaQuery('(max-width:768px)');

    const handleSend = () => {
        if (inputValue.trim() !== '') {
            setMessages((prevMessages) => [...prevMessages, { text: inputValue, user: true }]);
            setInputValue('');
        }
    };

    useEffect(() => {
        if (chatWindowRef.current) {
            //@ts-ignore
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);

    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                maxWidth: 768,
                width: '100%',
                mx: 'auto',
                backgroundColor: '#f9f9f9',
                p: 2,
                borderRadius: isMobile ? 0 : 2,
                boxShadow: isMobile ? 'none' : '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    textAlign: 'center',
                    p: 2,
                    backgroundColor: 'primary.main',
                    color: 'white',
                    borderRadius: '8px',
                    fontWeight: 500,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                }}
            >
                Chat
            </Typography>

            <Box
                ref={chatWindowRef}
                sx={{
                    flexGrow: 1,
                    overflowY: 'auto',
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.5,
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    maxHeight: 'calc(100vh - 120px)',
                }}
            >
                {messages.map((message, index) => (
                    <Box key={index} sx={{ display: 'flex', justifyContent: message.user ? 'flex-end' : 'flex-start' }}>
                        <Bubble isUser={message.user}>
                            <Typography variant="body1">{message.text}</Typography>
                        </Bubble>
                    </Box>
                ))}
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    borderTop: '1px solid #e0e0e0',
                    p: 2,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0px -2px 4px rgba(0,0,0,0.1)',
                }}
            >
                <TextField
                    fullWidth
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    //@ts-ignore
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    sx={{
                        '& .MuiInputBase-root': {
                            borderRadius: '8px',
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                />
                <Button
                    variant="contained"
                    onClick={handleSend}
                    sx={{
                        minWidth: '48px',
                        height: '48px',
                        borderRadius: '50%',
                    }}
                >
                    <SendIcon />
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
