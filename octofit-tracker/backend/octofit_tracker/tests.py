from django.test import TestCase
from .models import User, Team, Activity, Workout, Leaderboard
from django.utils import timezone

class ModelTests(TestCase):
    def setUp(self):
        self.team = Team.objects.create(name='Marvel', description='Marvel Team')
        self.user = User.objects.create(name='Spider-Man', email='spiderman@marvel.com', team=self.team)
        self.workout = Workout.objects.create(name='Pushups', description='Upper body workout')
        self.activity = Activity.objects.create(user=self.user, type='Running', duration=30, date=timezone.now().date())
        self.leaderboard = Leaderboard.objects.create(user=self.user, score=100)

    def test_user_team(self):
        self.assertEqual(self.user.team.name, 'Marvel')

    def test_activity_user(self):
        self.assertEqual(self.activity.user.email, 'spiderman@marvel.com')

    def test_leaderboard_score(self):
        self.assertEqual(self.leaderboard.score, 100)

    def test_workout_name(self):
        self.assertEqual(self.workout.name, 'Pushups')
