import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CaseItem {
  id: number;
  name: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  items: string[];
  price: number;
}

const cases: CaseItem[] = [
  {
    id: 1,
    name: 'Стартовый кейс',
    rarity: 'common',
    price: 50,
    items: ['Железная броня', 'Алмазный меч', '64 золота', 'Набор еды']
  },
  {
    id: 2,
    name: 'Редкий кейс',
    rarity: 'rare',
    price: 100,
    items: ['Алмазная броня', 'Зачарованный лук', '3 зелья', 'Элитры']
  },
  {
    id: 3,
    name: 'Эпический кейс',
    rarity: 'epic',
    price: 150,
    items: ['Незеритовая броня', 'Трезубец', 'Маяк', '5 тотемов']
  },
  {
    id: 4,
    name: 'Легендарный кейс',
    rarity: 'legendary',
    price: 200,
    items: ['Полный незерит', 'Драконье яйцо', '10 блоков алмазов', 'VIP статус']
  }
];

const rarityColors = {
  common: 'from-gray-500 to-gray-600',
  rare: 'from-blue-500 to-blue-600',
  epic: 'from-purple-500 to-purple-600',
  legendary: 'from-orange-500 to-yellow-500'
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [openingCase, setOpeningCase] = useState<number | null>(null);
  const [wonItem, setWonItem] = useState<string | null>(null);

  const openCase = (caseId: number) => {
    setOpeningCase(caseId);
    setWonItem(null);
    
    setTimeout(() => {
      const selectedCase = cases.find(c => c.id === caseId);
      if (selectedCase) {
        const randomItem = selectedCase.items[Math.floor(Math.random() * selectedCase.items.length)];
        setWonItem(randomItem);
      }
      
      setTimeout(() => {
        setOpeningCase(null);
        setWonItem(null);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Zornit</h1>
            <div className="flex gap-4">
              <Button 
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('home')}
              >
                <Icon name="Home" className="mr-2" size={18} />
                Главная
              </Button>
              <Button 
                variant={activeTab === 'donate' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('donate')}
              >
                <Icon name="Package" className="mr-2" size={18} />
                Донат
              </Button>
              <Button 
                variant={activeTab === 'rules' ? 'default' : 'ghost'}
                onClick={() => setActiveTab('rules')}
              >
                <Icon name="FileText" className="mr-2" size={18} />
                Правила
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeTab === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center space-y-6 py-16">
              <Badge className="mb-4 text-lg px-4 py-2">🎮 Версия 1.20.1</Badge>
              <h1 className="text-6xl font-bold gradient-text">
                Добро пожаловать на сервер
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Лучший игровой опыт с уникальными режимами, дружным комьюнити и честной администрацией
              </p>
              <div className="flex gap-4 justify-center mt-8">
                <Button size="lg" className="text-lg" onClick={() => setActiveTab('donate')}>
                  <Icon name="Package" className="mr-2" size={20} />
                  Открыть кейсы
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="Users" className="mr-2" size={20} />
                  Онлайн: 247
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: 'Zap', title: 'Уникальные режимы', desc: 'Выживание, SkyBlock, BedWars и многое другое' },
                { icon: 'Shield', title: 'Защита от гриферов', desc: 'Надежная система приватов и модерации' },
                { icon: 'Trophy', title: 'Система рангов', desc: 'Прокачивайся и получай эксклюзивные возможности' }
              ].map((feature, i) => (
                <Card key={i} className="neo-card border-0 hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                      <Icon name={feature.icon as any} className="text-primary" size={24} />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donate' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold gradient-text">Открой свой кейс</h2>
              <p className="text-muted-foreground text-lg">
                Получи крутые предметы и преимущества на сервере
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cases.map((caseItem) => (
                <Card 
                  key={caseItem.id} 
                  className={`neo-card border-0 overflow-hidden transition-all ${
                    openingCase === caseItem.id ? 'scale-105' : 'hover-scale'
                  }`}
                >
                  <div className={`h-32 bg-gradient-to-br ${rarityColors[caseItem.rarity]} relative`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon 
                        name="Package" 
                        size={64} 
                        className={`text-white ${openingCase === caseItem.id ? 'animate-spin' : ''}`}
                      />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {caseItem.name}
                      <Badge variant={caseItem.rarity === 'legendary' ? 'default' : 'secondary'}>
                        {caseItem.rarity}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      <ul className="space-y-1 mt-2">
                        {caseItem.items.map((item, i) => (
                          <li key={i} className="text-sm flex items-center">
                            <Icon name="Check" size={14} className="mr-2 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      disabled={openingCase !== null}
                      onClick={() => openCase(caseItem.id)}
                    >
                      {openingCase === caseItem.id ? (
                        <>
                          <Icon name="Loader" className="mr-2 animate-spin" size={16} />
                          Открываем...
                        </>
                      ) : (
                        <>
                          <Icon name="Unlock" className="mr-2" size={16} />
                          Открыть за {caseItem.price}₽
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {wonItem && (
              <Card className="neo-card border-primary/50 animate-scale-in max-w-md mx-auto">
                <CardHeader className="text-center">
                  <Icon name="Gift" size={48} className="mx-auto text-primary mb-4" />
                  <CardTitle className="text-2xl">Поздравляем!</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    Вы выиграли: <span className="text-primary font-semibold">{wonItem}</span>
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'rules' && (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-4xl font-bold gradient-text">Правила сервера</h2>
              <p className="text-muted-foreground">
                Соблюдение правил обязательно для всех игроков
              </p>
            </div>

            {[
              { title: 'Общие правила', rules: [
                'Запрещены читы и моды, дающие преимущество',
                'Уважайте других игроков',
                'Запрещен спам и реклама',
                'Запрещено использование багов'
              ]},
              { title: 'Правила чата', rules: [
                'Запрещены оскорбления и мат',
                'Не флудите в чате',
                'Запрещена политика и провокации',
                'Слушайте модераторов'
              ]},
              { title: 'Игровой процесс', rules: [
                'Запрещен гриф чужих построек',
                'Не убивайте в спавне',
                'Не создавайте лаговые механизмы',
                'Уважайте чужую собственность'
              ]}
            ].map((section, i) => (
              <Card key={i} className="neo-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Icon name="ScrollText" className="mr-3 text-primary" size={24} />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {section.rules.map((rule, j) => (
                      <li key={j} className="flex items-start">
                        <Badge className="mr-3 mt-1">{j + 1}</Badge>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card className="neo-card border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center text-destructive">
                  <Icon name="AlertTriangle" className="mr-3" size={24} />
                  Наказания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  За нарушение правил предусмотрены меры: предупреждение, мут, кик или бан. 
                  Серьезные нарушения (читы, гриф) караются немедленным баном.
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border/50 mt-20 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Zornit. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;