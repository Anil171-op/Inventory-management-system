import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Package, Image, Search } from 'lucide-react';

interface Product {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description?: string;
  image_url?: string;
}

interface ProductFormProps {
  product?: Product;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: Omit<Product, 'id'>) => void;
  loading?: boolean;
}

const categories = [
  'Electronics',
  'Clothing',
  'Food & Beverages', 
  'Home & Garden',
  'Sports & Fitness',
  'Books & Media',
  'Health & Beauty',
  'Toys & Games',
  'Automotive',
  'Office Supplies'
];

const suggestedImages = {
  'Electronics': [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
  ],
  'Clothing': [
    'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'
  ],
  'Food & Beverages': [
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400'
  ],
  'Home & Garden': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
    'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400'
  ],
  'Sports & Fitness': [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400',
    'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400'
  ]
};

export const ProductForm: React.FC<ProductFormProps> = ({
  product,
  isOpen,
  onClose,
  onSubmit,
  loading = false
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    quantity: 0,
    category: '',
    description: '',
    image_url: ''
  });
  
  const [showImageSuggestions, setShowImageSuggestions] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        quantity: product.quantity,
        category: product.category,
        description: product.description || '',
        image_url: product.image_url || ''
      });
    } else {
      setFormData({
        name: '',
        price: 0,
        quantity: 0,
        category: '',
        description: '',
        image_url: ''
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    setFormData({
      name: '',
      price: 0,
      quantity: 0,
      category: '',
      description: '',
      image_url: ''
    });
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData(prev => ({ ...prev, image_url: imageUrl }));
    setShowImageSuggestions(false);
  };

  const getSuggestedImages = () => {
    if (!formData.category || !suggestedImages[formData.category as keyof typeof suggestedImages]) {
      return suggestedImages['Electronics']; // Default fallback
    }
    return suggestedImages[formData.category as keyof typeof suggestedImages];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Product Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter product name"
              required
              className="bg-input/50 border-border focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                placeholder="0.00"
                required
                className="bg-input/50 border-border focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
                placeholder="0"
                required
                className="bg-input/50 border-border focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              required
            >
              <SelectTrigger className="bg-input/50 border-border focus:border-primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter product description"
              rows={3}
              className="bg-input/50 border-border focus:border-primary resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="image_url">Product Image URL</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowImageSuggestions(!showImageSuggestions)}
                className="text-xs"
              >
                <Search className="h-3 w-3 mr-1" />
                Browse Images
              </Button>
            </div>
            <Input
              id="image_url"
              value={formData.image_url}
              onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
              placeholder="https://example.com/image.jpg"
              className="bg-input/50 border-border focus:border-primary"
            />
          </div>

          {showImageSuggestions && formData.category && (
            <Card>
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  Suggested images for {formData.category}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {getSuggestedImages().map((imageUrl, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-muted rounded-md overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
                      onClick={() => handleImageSelect(imageUrl)}
                    >
                      <img 
                        src={imageUrl} 
                        alt={`Suggested ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {formData.image_url && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="aspect-square bg-muted rounded-md overflow-hidden w-24 mx-auto">
                <img 
                  src={formData.image_url} 
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '';
                    setFormData(prev => ({ ...prev, image_url: '' }));
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
              disabled={loading}
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};