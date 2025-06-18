import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Paper, 
  TextField, 
  IconButton, 
  Typography,
  Avatar,
  Fade,
  Grow,
  CircularProgress,
  Chip
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(139, 69, 19, 0.5); }
  50% { box-shadow: 0 0 20px rgba(139, 69, 19, 0.8), 0 0 30px rgba(139, 69, 19, 0.6); }
  100% { box-shadow: 0 0 5px rgba(139, 69, 19, 0.5); }
`;

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const ChatContainer = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: '70px',
  right: '16px',
  width: '320px',
  height: '420px',
  display: 'flex',
  flexDirection: 'column',
  background: '#0a0a0a',
  border: '1px solid transparent',
  backgroundImage: `
    linear-gradient(#0a0a0a, #0a0a0a),
    linear-gradient(90deg, 
      transparent 0%, 
      rgba(212, 175, 55, 0.5) 20%, 
      rgba(139, 69, 19, 0.8) 50%, 
      rgba(212, 175, 55, 0.5) 80%, 
      transparent 100%
    )
  `,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow: `
    0 20px 40px rgba(0, 0, 0, 0.95),
    inset 0 1px 0 rgba(212, 175, 55, 0.2),
    0 0 120px rgba(139, 69, 19, 0.15)
  `,
  overflow: 'hidden',
  zIndex: 1000,
  borderRadius: '20px',
  backdropFilter: 'blur(20px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.6), transparent)',
    backgroundSize: '200% 100%',
    animation: `${shimmer} 3s linear infinite`,
    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    maskComposite: 'xor',
    WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    opacity: 0.5
  },
  '@media (max-width: 600px)': {
    width: '85vw',
    height: '60vh',
    right: '7.5vw',
    bottom: '60px',
    borderRadius: '16px'
  }
}));

const ChatHeader = styled(Box)({
  padding: '12px 16px',
  background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.95) 0%, rgba(101, 67, 33, 0.95) 100%)',
  borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'relative',
  backdropFilter: 'blur(10px)',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -1,
    left: '20%',
    right: '20%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent)',
    animation: `${glow} 2s ease-in-out infinite`
  }
});

const MessagesContainer = styled(Box)({
  flex: 1,
  padding: '16px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(139,69,19,0.05) 100%)',
  '&::-webkit-scrollbar': {
    width: '4px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'rgba(139, 69, 19, 0.05)',
    borderRadius: '2px'
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'linear-gradient(180deg, #8B4513 0%, #D4A574 100%)',
    borderRadius: '2px',
    '&:hover': {
      background: 'linear-gradient(180deg, #A0522D 0%, #DAA520 100%)'
    }
  }
});

const MessageBubble = styled(Box)(({ isUser }) => ({
  display: 'flex',
  gap: '8px',
  flexDirection: isUser ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  animation: `${fadeInUp} 0.3s ease-out`
}));

const Message = styled(Paper)(({ isUser }) => ({
  padding: '10px 14px',
  maxWidth: '75%',
  wordWrap: 'break-word',
  background: isUser 
    ? 'linear-gradient(135deg, rgba(139, 69, 19, 0.9) 0%, rgba(101, 67, 33, 0.9) 100%)' 
    : 'rgba(20, 20, 20, 0.95)',
  color: isUser ? '#FFE4B5' : '#E0E0E0',
  border: `1px solid ${isUser ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.05)'}`,
  borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
  fontSize: '0.8rem',
  lineHeight: 1.5,
  boxShadow: isUser 
    ? '0 4px 12px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.2)' 
    : '0 2px 8px rgba(0, 0, 0, 0.4)',
  backdropFilter: 'blur(10px)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: isUser 
      ? 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)'
      : 'none',
    opacity: 0.5
  }
}));

const StyledAvatar = styled(Avatar)(({ isHarvey }) => ({
  width: 28,
  height: 28,
  background: isHarvey 
    ? 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)'
    : 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
  border: `1.5px solid ${isHarvey ? 'rgba(255, 215, 0, 0.4)' : 'rgba(255, 255, 255, 0.1)'}`,
  boxShadow: isHarvey 
    ? '0 0 20px rgba(212, 175, 55, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
    : 'none',
  animation: isHarvey ? `${pulse} 4s ease-in-out infinite` : 'none',
  fontSize: '0.8rem',
  fontWeight: 'bold'
}));

const InputContainer = styled(Box)({
  padding: '12px',
  borderTop: '1px solid rgba(212, 175, 55, 0.2)',
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(139, 69, 19, 0.1) 100%)',
  backdropFilter: 'blur(10px)'
});

const StyledTextField = styled(TextField)({
  flex: 1,
  '& .MuiOutlinedInput-root': {
    color: '#E0E0E0',
    fontSize: '0.8rem',
    height: '36px',
    background: 'rgba(20, 20, 20, 0.5)',
    '& fieldset': {
      borderColor: 'rgba(212, 175, 55, 0.2)',
      borderRadius: '18px'
    },
    '&:hover fieldset': {
      borderColor: 'rgba(212, 175, 55, 0.4)'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D4A574',
      borderWidth: '1px'
    }
  },
  '& .MuiInputBase-input': {
    fontSize: '0.8rem',
    padding: '8px 14px',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.3)'
    }
  }
});

const SendButton = styled(IconButton)({
  background: 'linear-gradient(135deg, #D4A574 0%, #8B4513 100%)',
  color: '#FFF',
  width: '36px',
  height: '36px',
  boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  '&:hover': {
    background: 'linear-gradient(135deg, #DAA520 0%, #A0522D 100%)',
    transform: 'scale(1.05)',
    boxShadow: '0 4px 12px rgba(212, 175, 55, 0.5)'
  },
  '&:disabled': {
    opacity: 0.5
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.1rem'
  }
});

const PowerBadge = styled(Chip)({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)',
  color: '#000',
  fontWeight: '900',
  fontSize: '0.6rem',
  height: '18px',
  letterSpacing: '0.5px',
  boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
  border: '1px solid rgba(184, 134, 11, 0.3)',
  '& .MuiChip-label': {
    padding: '0 6px'
  }
});

// Harvey Persona
const HARVEY_INTRO = {
  text: `Listen - I know exactly why you're here. That deal that's stuck. The surgeon who won't return calls. The competitor undercutting you.

I've got your back. 15 years, 2.4M provider profiles analyzed. I know every objection before they say it.

Tell me what's blocking you right now. Let's solve it.`,
  isUser: false,
  isHarvey: true,
  timestamp: new Date()
};

function HarveyChat({ open, onClose }) {
  const [messages, setMessages] = useState([HARVEY_INTRO]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      text: input,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate Harvey's response
    setTimeout(() => {
      const harveyResponse = {
        text: generateHarveyResponse(input),
        isUser: false,
        isHarvey: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, harveyResponse]);
      setLoading(false);
    }, 1500);
  };

  const generateHarveyResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    
    // Context-aware responses based on keywords
    if (lowerInput.includes('stuck') || lowerInput.includes('deal') || lowerInput.includes('close')) {
      return "I see it. Here's your move: Stop selling features. That surgeon cares about one thing - patient outcomes. Send them your top 3 case studies, but lead with the complication rates. Then go silent for 48 hours. Trust me.";
    }
    
    if (lowerInput.includes('competitor') || lowerInput.includes('price') || lowerInput.includes('undercut')) {
      return "Price war? Never compete on price. You compete on access. Tell them: 'Dr., my competitors might be 15% cheaper, but when you need support at 10 PM on a Saturday, I'm the only one answering.' Then prove it.";
    }
    
    if (lowerInput.includes('meeting') || lowerInput.includes('appointment') || lowerInput.includes('busy')) {
      return "Can't get face time? Stop asking for meetings. Send this: 'Dr., I have 3 surgeons in your building using our tech. 5 minute coffee Thursday to show you their results?' Make it about peer validation, not your pitch.";
    }
    
    if (lowerInput.includes('objection') || lowerInput.includes('concern') || lowerInput.includes('worried')) {
      return "Perfect. Objections mean they're engaged. Whatever they said, repeat it back slower: 'So your concern is...' Then shut up. Count to 5. They'll tell you exactly how to close them. Works every time.";
    }
    
    if (lowerInput.includes('help') || lowerInput.includes('advice') || lowerInput.includes('strategy')) {
      return "Here's what separates closers from everyone else: We solve problems before they're asked. Text your top 5 prospects right now: 'Saw the new reimbursement changes. I have a workaround. Coffee?' You'll book 3 meetings by tomorrow.";
    }
    
    // Default responses for general queries
    const responses = [
      "Got it. Here's the play: Your prospect is drowning in vendor calls. Stand out. Send a handwritten note with ONE patient success metric. No brochures. No pitch. Just results. Follow up in 3 days.",
      "I know this pattern. You're overthinking it. The best reps I've trained do one thing differently - they sell the dream, not the device. What transformation does your product enable? Lead with that.",
      "Smart question. Let me tell you what your competition doesn't know: Physicians buy from people who make their lives easier. Not products. Not features. Ease. How can you remove friction from their day?",
      "This is exactly where deals die. But not yours. Next interaction, flip the script: 'Dr., what would need to be true for this to be a no-brainer for you?' Then deliver exactly that. Nothing more.",
      "I've watched 1,000 reps fail here. You won't. Your advantage? You're asking the right questions. Now go deeper: What's their personal win? Not the practice's. Theirs. Solve for that.",
      "Here's your edge: Everyone's pitching features. You're going to pitch time. 'Dr., this saves you 20 minutes per procedure.' Time is their scarcest resource. Position yourself as the one who gives it back."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!open) return null;

  return (
    <Grow in={open}>
      <ChatContainer elevation={24}>
        <ChatHeader>
          <Box display="flex" alignItems="center" gap={1}>
            <BusinessCenterIcon sx={{ color: '#FFD700', fontSize: '1.4rem' }} />
            <Typography variant="h6" sx={{ 
              fontWeight: '800', 
              color: '#FFE4B5',
              letterSpacing: '1px',
              textShadow: '0 2px 8px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.1)',
              fontSize: '0.9rem'
            }}>
              HARVEY
            </Typography>
          </Box>
          <PowerBadge label="CLOSER" size="small" />
          <IconButton onClick={onClose} size="small" sx={{ 
            color: '#FFE4B5',
            padding: '4px',
            '&:hover': {
              background: 'rgba(255, 215, 0, 0.1)'
            }
          }}>
            <CloseIcon sx={{ fontSize: '1.2rem' }} />
          </IconButton>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((message, index) => (
            <MessageBubble key={index} isUser={message.isUser}>
              <StyledAvatar isHarvey={message.isHarvey}>
                {message.isHarvey ? 'H' : 'U'}
              </StyledAvatar>
              <Message isUser={message.isUser}>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                  {message.text}
                </Typography>
              </Message>
            </MessageBubble>
          ))}
          {loading && (
            <MessageBubble isUser={false}>
              <StyledAvatar isHarvey={true}>H</StyledAvatar>
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} sx={{ color: '#D4A574' }} />
                <Typography variant="body2" sx={{ color: 'rgba(212, 175, 55, 0.8)', fontSize: '0.75rem' }}>
                  Harvey is thinking...
                </Typography>
              </Box>
            </MessageBubble>
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer>
          <StyledTextField
            fullWidth
            variant="outlined"
            placeholder="State your business..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            size="small"
          />
          <SendButton onClick={handleSend} disabled={!input.trim() || loading} size="small">
            <SendIcon fontSize="small" />
          </SendButton>
        </InputContainer>
      </ChatContainer>
    </Grow>
  );
}

export default HarveyChat;