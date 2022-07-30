import * as twilio from 'twilio';
import { Injectable } from '@nestjs/common';
import { VoicemailDto } from './voicemail.dto';
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';

@Injectable()
export class IvrService {
  public handleIncomingCustomer(): VoiceResponse {
    const voiceResponse = new twilio.twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      action: '/ivr/caller-response',
      numDigits: 1,
      method: 'POST',
    });

    gather.say(
      { loop: 3 },
      'Thanks for calling the XYZ Company. Please press 1 to talk to the owner. Press 2 to leave a voicemail.',
    );

    return voiceResponse;
  }

  public forwardCallToOwner(): VoiceResponse {
    const voiceResponse = new twilio.twiml.VoiceResponse();

    voiceResponse.say('Connecting you to Abdul Ahad');

    voiceResponse.dial(
      {
        action: 'ivr/finish-call',
        method: 'POST',
      },
      '+923353065343',
    );

    return voiceResponse;
  }

  public recordVoiceMailFromCaller(): VoiceResponse {
    const voiceResponse = new twilio.twiml.VoiceResponse();

    voiceResponse.say(
      'Please leave a message at the beep. Press the star key when finished.',
    );

    voiceResponse.record({
      action: '/ivr/finish-call',
      recordingStatusCallback: '/ivr/recording-available',
      method: 'POST',
      maxLength: 60,
      finishOnKey: '*',
    });

    return voiceResponse;
  }

  public finishCustomerCall(): VoiceResponse {
    const voiceResponse = new twilio.twiml.VoiceResponse();

    voiceResponse.say('Thank you for calling. Good bye!');

    voiceResponse.hangup();

    return voiceResponse;
  }

  public handleInvalidCustomerDigitInput(): VoiceResponse {
    const voiceResponse = new twilio.twiml.VoiceResponse();

    const gather = voiceResponse.gather({
      action: '/ivr/caller-response',
      numDigits: 1,
      method: 'POST',
    });

    gather.say(
      { loop: 3 },
      'You have selected an invalid digit. Please press 1 to talk to an agent. Press 2 to leave a voicemail.',
    );

    return voiceResponse;
  }

  public saveRecordingInDatabase(voicemailDto: VoicemailDto) {
    // Save in database (voicemailDto)
  }
}
