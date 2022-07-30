import { IvrService } from './ivr.service';
import { VoicemailDto } from './voicemail.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { CallerResponseDto } from './caller-response.dto';

@Controller('ivr')
export class IvrController {
  public constructor(private ivrService: IvrService) {}

  @Post('incoming-call')
  public acceptIncomingCall(): string {
    return this.ivrService.handleIncomingCustomer().toString();
  }

  @Post('caller-response')
  public incomingCallerResponse(
    @Body() callerResponseDto: CallerResponseDto,
  ): string {
    if (callerResponseDto.Digits === '1') {
      return this.ivrService.forwardCallToOwner().toString();
    }

    if (callerResponseDto.Digits === '2') {
      return this.ivrService.recordVoiceMailFromCaller().toString();
    }

    return this.ivrService.handleInvalidCustomerDigitInput().toString();
  }

  @Post('finish-call')
  public finishCustomerCall(): string {
    return this.ivrService.finishCustomerCall().toString();
  }

  @Post('recording-available')
  public storeRecordedVoiceMail(@Body() voicemailDto: VoicemailDto) {
    return this.ivrService.saveRecordingInDatabase(voicemailDto);
  }
}
