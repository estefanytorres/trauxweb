export class AuthUser {
  public username: string;
  public password: string;
  public user_id: number;
  public first_name: string;
  public last_name: string;
  public email: string;
  public url: string;
  public is_staff: boolean;
  public license: number;

  public updateValues(data) {
    this.username = data.username;
    // this.user_id = data.user_id;
    this.first_name = data.username;
    this.last_name = data.last_name;
    this.email = data.email;
    this.url = data.url;
    this.is_staff = data.is_staff;
  }
}
