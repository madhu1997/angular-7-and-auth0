class User {
  constructor({nickname, name, picture, sub}) {
    this.name = name;
    this.niclname = nickname;
    this.picture = picture;
    [this.authType, this.id] = sub.split("|")
  }
}
module.exports = User;