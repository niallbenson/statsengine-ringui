export default function getPlayerDisplayName(player) {
  return player.nickName != null ? player.nickName : player.name;
}