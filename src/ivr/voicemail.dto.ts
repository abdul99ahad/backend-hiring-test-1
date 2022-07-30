export class VoicemailDto {
  public RecordingUrl: string;
  public RecordingStatus: 'completed' | 'failed';
  public RecordingDuration: string;
}
