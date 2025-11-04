"use client"
import { vapi } from '@/lib/vapi.sdk';
import React, { useEffect, useRef, useState } from 'react'
import soundwaves from '@/constants/soundwaves.json';
import Image from 'next/image';
import { getSubjectColor } from '@/lib/utils';
import Lottie, { LottieComponentProps, LottieRefCurrentProps } from 'lottie-react';
import { Button } from './ui/button';
import { Mic, MicOff } from 'lucide-react';

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

    useEffect(() => {
        if (lottieRef) {
            if (isSpeaking) {
                lottieRef.current?.play();
            } else {
                lottieRef.current?.stop();
            }
        }
    }, [isSpeaking, lottieRef]);
    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatusEnum.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatusEnum.FINISHED);
        const onMessage = () => { };
        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => console.log(error);

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
        setIsMuted(!isMuted);
    }
    return (
        <div className='grid grid-cols-5 border h-[60vh] mt-10 gap-10'>
            <section className='border col-span-3'>
                <div className='border h-full flex flex-col items-center justify-center border-orange-500 '>
                    <div className={`${callStatus === CallStatusEnum.FINISHED || callStatus === CallStatusEnum.INACTIVE ? 'opacity-100' : 'opacity-0'} ${callStatus === CallStatusEnum.CONNECTING && 'opacity-100 animate-pulse'} flex flex-col items-center justify-center`}>
                        <div className='size-24 flex items-center justify-center rounded-lg' style={{ backgroundColor: getSubjectColor(subject) }}>
                            <Image src={`/icons/${subject}.svg`} alt={subject} width={35} height={35} className='' />
                        </div>
                        <h1 className='text-2xl font-bold'>{name}</h1>
                    </div>
                    <div className={`${callStatus === CallStatusEnum.ACTIVE ? 'opacity-100' : 'opacity-0'} `}>
                        <Lottie
                            lottieRef={lottieRef}
                            animationData={soundwaves}
                            autoPlay={false}
                        />
                    </div>
                </div>
            </section>
            <section className='border col-span-2 flex flex-col justify-between'>
                <div className='border flex flex-col items-center justify-center p-20'>
                    <div className='text-center'>
                        <div className='size-24'>
                            <Image src={userImage} alt={userName} width={100} height={100} className='rounded-xl' />
                        </div>
                        <h3>{userName}</h3>
                    </div>
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <button className='border bg-secondary flex-1 flex items-center justify-center flex-col p-10 cursor-pointer' onClick={toggleMicrophone}>
                        {
                            isMuted ? <MicOff/> :<Mic/>
                        }
                        <p>{isMuted ? 'Unmute' : 'Mute'}</p>
                    </button>
                    <button className={`border bg-secondary flex-1 p-10 cursor-pointer`}>
                          {callStatus === CallStatusEnum.ACTIVE
                        ? "End Session"
                        : callStatus === CallStatusEnum.CONNECTING
                            ? 'Connecting'
                        : 'Start Session'
                        }
                    </button>
                </div>
                <Button size={'lg'} variant={'destructive'} className='w-full'>End</Button>
            </section>
            {/* <section className="transcript">
                <div className="transcript-message no-scrollbar">
                    {messages.map((message, index) => {
                        if(message.role === 'assistant') {
                            return (
                                <p key={index} className="max-sm:text-sm">
                                    {
                                        name
                                            .split(' ')[0]
                                            .replace('/[.,]/g, ','')
                                    }: {message.content}
                                </p>
                            )
                        } else {
                           return <p key={index} className="text-primary max-sm:text-sm">
                                {userName}: {message.content}
                            </p>
                        }
                    })}
                </div>

                <div className="transcript-fade" />
            </section> */}
        </div>
    )
}

export default CompanionComponent  