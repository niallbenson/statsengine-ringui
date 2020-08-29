export default function getPlayerDisplayLastName(player) {
  const fullName = player.nickName != null ? player.nickName : player.name;

  return fullName.split(' ').pop();
}