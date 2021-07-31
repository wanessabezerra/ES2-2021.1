# Generated by Django 3.1.2 on 2021-07-31 22:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id_project', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('closed_in', models.DateField()),
                ('color', models.IntegerField()),
                ('has_archive', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Reminder',
            fields=[
                ('id_project', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id_user', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=200)),
                ('birthday', models.DateField()),
                ('email', models.EmailField(max_length=254)),
                ('avatar_url', models.URLField(max_length=254)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id_task', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('note', models.TextField(max_length=254)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('closed_in', models.DateField()),
                ('status', models.CharField(choices=[('1', 'Planejada'), ('2', 'Em Execução'), ('3', 'Concluída'), ('4', 'Cancelada')], max_length=1)),
                ('priority', models.CharField(choices=[(0, 'Baixa'), (1, 'Normal'), (2, 'Alta')], max_length=1)),
                ('score', models.FloatField(db_index=True, default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
