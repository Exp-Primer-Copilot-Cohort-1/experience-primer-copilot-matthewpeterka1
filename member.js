function skillsMember() {
  var skills = document.querySelectorAll('.skills');
  var skillsArray = Array.prototype.slice.call(skills);
  var skillsWidth = skillsArray.map(function (skill) {
    return skill.offsetWidth;
  });
  var skillsMaxWidth = Math.max.apply(null, skillsWidth);
  skillsArray.forEach(function (skill) {
    skill.style.width = skillsMaxWidth + 'px';
  });
}