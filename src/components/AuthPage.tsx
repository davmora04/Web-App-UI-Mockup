import React from 'react';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { useApp } from './AppContext';
import { toast } from 'sonner';

export const AuthPage: React.FC = () => {
  const { t, teams } = useApp();
  const [mode, setMode] = React.useState<'signin' | 'signup'>('signin');
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    favoriteTeam: ''
  });

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Nombre
    if (mode === 'signup' && !formData.name.trim()) {
      newErrors.name = t('required');
    }

    // Email
    if (!formData.email.trim()) {
      newErrors.email = t('required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('invalidEmail');
    }

    // Password
    if (!formData.password) {
      newErrors.password = t('required');
    } else if (!validatePassword(formData.password)) {
      newErrors.password = t('passwordTooShort');
    }

    // Confirm password
    if (mode === 'signup') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = t('required');
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordsDoNotMatch');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (mode === 'signin') {
        toast.success(`${t('signIn')} ${t('success')}`);
      } else {
        toast.success(`${t('signUp')} ${t('success')}`);
      }

      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        favoriteTeam: ''
      });
    } catch {
      toast.error(t('errorOccurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      favoriteTeam: ''
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary text-primary-foreground rounded-full p-3">
              <User className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">
            {mode === 'signin' ? t('signIn') : t('signUp')}
          </CardTitle>
          <p className="text-muted-foreground">
            {mode === 'signin' ? t('signInSubtitle') : 'Create a new account'}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name (sign up only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="name">{t('name')}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`pl-10 ${errors.name ? 'border-destructive' : ''}`}
                  />
                </div>
                {errors.name && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.name}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <Alert variant="destructive">
                  <AlertDescription>{errors.password}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Confirm password (sign up only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{t('confirmPassword')}</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <Alert variant="destructive">
                    <AlertDescription>{errors.confirmPassword}</AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            {/* Favorite team (sign up only) */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <Label htmlFor="favoriteTeam">Favorite Team (Optional)</Label>
                <div className="relative">
                  <Star className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <select
                    id="favoriteTeam"
                    value={formData.favoriteTeam}
                    onChange={(e) => handleInputChange('favoriteTeam', e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-input bg-background rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  >
                    <option value="">Select your favorite team</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.logo} {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-xs text-muted-foreground">
                  We’ll show personalized content for your favorite team.
                </p>
              </div>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? t('loading') : (
                <>
                  {mode === 'signin' ? t('signIn') : t('signUp')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {/* Switch mode link */}
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={toggleMode}
                className="text-sm"
              >
                {mode === 'signin'
                  ? (<>{t('dontHaveAccount')} {t('signUpHere')}</>)
                  : (<>{t('alreadyHaveAccount')} {t('signInHere')}</>)
                }
              </Button>
            </div>
          </form>

          {/* Bottom legal */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              {t('byContinuing')} <a className="underline">{t('termsOfService')}</a> {t('and')}{' '}
              <a className="underline">{t('privacyPolicy')}</a>.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
