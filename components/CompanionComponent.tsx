"use client"
import { vapi } from '@/lib/vapi.sdk';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json';
import Image from 'next/image';
import { cn, getSubjectColor, configureAssistant } from '@/lib/utils';
import Lottie, { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react';
import { Button } from './ui/button';
import { Mic, MicOff, PhoneOff, Play } from 'lucide-react';

enum CallStatusEnum {
    INACTIVE = 'INACTIVE',
    ACTIVE = 'ACTIVE',
    CONNECTING = 'CONNECTING',
    FINISHED = 'FINISHED'
}
const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, voice, style }: CompanionComponentProps) => {

    const [callStatus, setCallStatus] = React.useState<CallStatusEnum>(CallStatusEnum.INACTIVE);
    const [isSpeaking, setIsSpeaking] = React.useState<boolean>(false);
    const [isMuted, setIsMuted] = useState(false)
    const lottieRef = useRef<LottieRefCurrentProps>(null);
    const transcriptRef = useRef<HTMLDivElement | null>(null);
    const [messages, setMessages] = useState<SavedMessage[]>([]);

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);
    // auto-scroll transcript to bottom when messages change
    useEffect(() => {
        if (!transcriptRef.current) return;
        transcriptRef.current.scrollTo({
            top: transcriptRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatusEnum.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatusEnum.FINISHED);
        // const onMessage = () => { };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log(error);
        const onMessage = (message: Message) => {
            if (message.type === 'transcript' && message.transcriptType === 'final') {
                const newMessage = { role: message.role, content: message.transcript }
                setMessages((prev) => [...prev, newMessage])
            }
        }

        vapi.on('call-start', onCallStart);
        vapi.on('call-end', onCallEnd);
        vapi.on('message', onMessage);
        vapi.on('error', onError);
        vapi.on('speech-start', onSpeechStart);
        vapi.on('speech-end', onSpeechEnd);
        return () => {
            vapi.off('call-start', onCallStart);
            vapi.off('call-end', onCallEnd);
            vapi.off('message', onMessage);
            vapi.off('error', onError);
            vapi.off('speech-start', onSpeechStart);
            vapi.off('speech-end', onSpeechEnd)
        };
    }, []);

    const toggleMicrophone = () => {
        const isMuted = vapi.isMuted();
        vapi.setMuted(!isMuted);
        setIsMuted(!isMuted)
    }

    const handleCall = async () => {
        setCallStatus(CallStatusEnum.CONNECTING)

        const assistantOverrides = {
            variableValues: { subject, topic, style },
            clientMessages: ["transcript"],
            serverMessages: [],
        }

        // @ts-expect-error
        vapi.start(configureAssistant(voice, style), assistantOverrides)
    }

    const handleDisconnect = () => {
        setCallStatus(CallStatusEnum.FINISHED)
        vapi.stop()
    }
    return (
        <div className=''>


            <div className='grid grid-cols-5  mb-10 mt-7 gap-10'>
                <section className=' bg-secondary/50 rounded-xl col-span-3'>
                    {/* make container relative and absolutely position both panels so they overlap and stay centered */}
                    <div className="h-full relative border-orange-500">
                        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-200 ${callStatus === CallStatusEnum.CONNECTING ? 'opacity-100 animate-pulse pointer-events-none' : (callStatus === CallStatusEnum.ACTIVE ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto')}`}>
                            <div className='size-24 flex items-center justify-center rounded-lg' style={{ backgroundColor: getSubjectColor(subject) }}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} className='' />
                            </div>
                            <h1 className='text-2xl font-bold'>{name}</h1>
                        </div>

                        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${callStatus === CallStatusEnum.ACTIVE ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                            <Lottie
                                lottieRef={lottieRef}
                                animationData={soundwaves}
                                autoPlay={false}
                            />
                        </div>
                    </div>
                </section>
                <section className='  col-span-2 flex flex-col justify-between gap-3'>
                    <div className='bg-secondary/50 rounded-xl flex flex-col items-center justify-center p-10'>
                        <div className='text-center'>
                            <div className='size-24'>
                                <Image src={userImage} alt={userName} width={100} height={100} className='rounded-xl' />
                            </div>
                            <h3>{userName}</h3>
                        </div>
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <button className=' rounded-xl hover:bg-secondary/50 bg-secondary flex-1 flex items-center justify-center flex-col p-5 cursor-pointer' onClick={toggleMicrophone}>
                            {
                                isMuted ? <MicOff /> : <Mic />
                            }
                            <p>{isMuted ? 'Unmute' : 'Mute'}</p>
                        </button>
                        {/* <button className={cn('rounded-lg py-2 cursor-pointer transition-colors w-full text-white', callStatus === CallStatusEnum.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatusEnum.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatusEnum.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatusEnum.ACTIVE
                            ? "End Session"
                            : callStatus === CallStatusEnum.CONNECTING
                                ? 'Connecting'
                                : 'Start Session'
                        }
                    </button> */}
                    </div>
                    <button className={cn('rounded-lg py-3 cursor-pointer transition-colors w-full text-white', callStatus === CallStatusEnum.ACTIVE ? 'bg-red-700' : 'bg-primary', callStatus === CallStatusEnum.CONNECTING && 'animate-pulse')} onClick={callStatus === CallStatusEnum.ACTIVE ? handleDisconnect : handleCall}>
                        {callStatus === CallStatusEnum.ACTIVE
                            ? (<span className='flex item-center gap-2 justify-center'><PhoneOff className='text-white' /> End Session</span>)
                            : callStatus === CallStatusEnum.CONNECTING
                                ? 'Connecting'
                                : (<span className='flex item-center gap-2 justify-center'><Play className='text-white' /> Start Session</span>)
                        }
                    </button>
                    {/* <Button size={'lg'} variant={'destructive'} className='w-full'>End</Button> */}
                </section>
                <section className="col-span-5">
                    <div
                        ref={transcriptRef}
                        className="h-64 md:h-[25vh] overflow-y-auto p-4 space-y-3 bg-white/5 rounded-lg no-scrollbar"
                        aria-live="polite"
                    >
                        {messages.length === 0 && (
                            <div className="text-center text-sm text-muted-foreground">No messages yet — start the session to see the transcript</div>
                        )}

                        {messages.map((message, index) => {
                            const isAssistant = message.role === "assistant";
                            return (
                                <div key={index} className={`flex items-start gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}>
                                    {isAssistant && (
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                                            style={{ backgroundColor: getSubjectColor(subject) }}
                                            title="Companion"
                                        >
                                            🤖
                                        </div>
                                    )}

                                    <div className={`max-w-[75%] p-3 rounded-lg break-words ${isAssistant ? "bg-gray-100 text-black" : "bg-primary text-white"}`}>
                                        <div className="text-xs opacity-80 mb-1">
                                            {isAssistant ? "Companion" : userName}
                                        </div>
                                        <div className="text-sm leading-relaxed">
                                            {message.content}
                                        </div>
                                    </div>

                                    {!isAssistant && (
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-sm text-white shrink-0"
                                            style={{ backgroundColor: "rgba(0,0,0,0.08)" }}
                                            title={userName}
                                        >
                                            {userName?.charAt(0)?.toUpperCase() ?? "U"}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    )
}

export default CompanionComponent