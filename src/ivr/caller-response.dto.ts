import { StandardTwilioRequestDto } from './standard-twilio-request.dto';

export class CallerResponseDto extends StandardTwilioRequestDto {
  public Digits: string;
}
